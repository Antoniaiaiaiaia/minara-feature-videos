"""Fetch real transparent asset marks; each completed file is a resume point."""
import concurrent.futures, hashlib, json, pathlib, urllib.request
from PIL import Image

HERE = pathlib.Path(__file__).resolve().parent
DEST = HERE.parent.parent / 'assets/clear-logos'
TREE = json.loads((HERE / 'tree.json').read_text())
PATHS = {item['path'] for item in TREE['tree']}
ROOT = f"https://raw.githubusercontent.com/nvstly/icons/{TREE['sha']}/"
STOCKS = 'NVDA AAPL MSFT AMZN GOOGL META TSLA AMD AVGO MU PLTR COIN NFLX RKLB SNDK ORCL ADBE CRM INTC QCOM TXN AMAT LRCX KLAC ADI ANET ARM TSM ASML SHOP UBER ABNB HOOD CRWD SNOW PANW NET DDOG NOW IBM INTU CSCO DELL HPQ HPE SMCI WMT COST TGT HD LOW NKE SBUX MCD KO PEP DIS CMCSA VZ T TMUS V MA AXP PYPL JPM BAC C GS MS WFC SCHW BLK BRK.B CAT DE GE HON BA LMT RTX NOC GD UPS FDX UNP CSX XOM CVX COP SLB OXY EOG PFE MRK ABBV ABT AMGN GILD LLY JNJ UNH CVS TMO DHR ISRG REGN VRTX MDT BMY ZTS LIN APD SHW FCX NEM NUE CEG NEE DUK SO AEP D DAL UAL AAL RCL MAR HLT BKNG MELI DASH SPOT ROKU RBLX EA TTWO WDAY TEAM ZM DOCU SQ FIS FISV ADP PAYX MCO SPGI CME ICE CBOE AIG MET PRU CB PGR TRV'.split()
CRYPTO = 'BTC ETH SOL XRP DOGE ADA AVAX LINK SUI HYPE BNB TRX DOT LTC BCH XLM XMR ETC ATOM NEAR APT ARB OP UNI AAVE MKR ICP FIL HBAR VET ALGO EOS XTZ THETA GRT RUNE INJ QNT EGLD STX FTM SNX CRV LDO DYDX COMP ZEC DASH KSM FLOW BAT ENJ CHZ SAND MANA AXS GALA IMX PEPE SHIB TON WIF BONK JUP'.split()

def fetch(item):
    symbol, category = item
    remote = f"{'crypto_icons' if category == 'crypto' else 'ticker_icons'}/{symbol}.png"
    if remote not in PATHS:
        return None
    target = DEST / f'{category}-{symbol}.png'
    try:
        if not target.exists():
            data = urllib.request.urlopen(ROOT + remote, timeout=20).read()
            partial = target.with_suffix('.part')
            partial.write_bytes(data)
            partial.replace(target)
        with Image.open(target) as image:
            alpha = image.convert('RGBA').getchannel('A')
            if alpha.getextrema()[0] != 0:
                return None
        return dict(symbol=symbol, category=category, logo=f'assets/clear-logos/{target.name}', source=ROOT+remote, sha256=hashlib.sha256(target.read_bytes()).hexdigest())
    except Exception as error:
        return dict(symbol=symbol, error=str(error))

if __name__ == '__main__':
    DEST.mkdir(parents=True, exist_ok=True)
    requested = [(s, 'stocks') for s in STOCKS] + [(s, 'crypto') for s in CRYPTO]
    results = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as pool:
        for result in pool.map(fetch, requested):
            if result:
                results[result['symbol']] = result
                (HERE / 'download-progress.json').write_text(json.dumps(results, indent=2))
    groups = []
    for names, count in [(STOCKS, 110), (CRYPTO, 48)]:
        group = [results[s] for s in names if s in results and 'error' not in results[s]][:count]
        assert len(group) == count, (len(group), count)
        groups.append(group)
    chosen = groups[0] + groups[1]
    assert len({item['sha256'] for item in chosen}) == len(chosen), 'Duplicate image bytes'
    (HERE / 'selected.json').write_text(json.dumps(chosen, indent=2))
    print('Saved 110 unique stock logos + 48 unique crypto logos; source files retained unchanged.')
