
// These are WebTransport addresses, they will all fail because the
// remote hosts use self-signed certs or have gone away
const addresses = ['https://18.170.212.94:24737/.well-known/libp2p-webtransport?type=noise', 'https://18.170.212.94:54047/.well-known/libp2p-webtransport?type=noise', 'https://23.145.40.100:1495/.well-known/libp2p-webtransport?type=noise', 'https://[2602:fb95:3:1::8]:4001/.well-known/libp2p-webtransport?type=noise', 'https://185.127.122.250:4001/.well-known/libp2p-webtransport?type=noise', 'https://45.56.95.37:4001/.well-known/libp2p-webtransport?type=noise', 'https://[64:ff9b::2d38:5f25]:4001/.well-known/libp2p-webtransport?type=noise', 'https://167.99.209.1:52546/.well-known/libp2p-webtransport?type=noise', 'https://89.251.251.195:4001/.well-known/libp2p-webtransport?type=noise', 'https://[2a02:121e:21e:1:546f:18ff:fea8:8e]:4001/.well-known/libp2p-webtransport?type=noise', 'https://23.111.173.218:4001/.well-known/libp2p-webtransport?type=noise', 'https://45.83.104.156:443/.well-known/libp2p-webtransport?type=noise', 'https://[2a03:4000:46:26e::c17]:443/.well-known/libp2p-webtransport?type=noise', 'https://162.19.169.49:4001/.well-known/libp2p-webtransport?type=noise', 'https://[2001:41d0:700:6c31::]:4001/.well-known/libp2p-webtransport?type=noise', 'https://89.58.11.155:4001/.well-known/libp2p-webtransport?type=noise', 'https://39.107.86.243:4001/.well-known/libp2p-webtransport?type=noise', 'https://82.100.213.94:4001/.well-known/libp2p-webtransport?type=noise', 'https://47.87.143.204:4001/.well-known/libp2p-webtransport?type=noise', 'https://85.17.7.65:4001/.well-known/libp2p-webtransport?type=noise', 'https://45.79.224.29:4001/.well-known/libp2p-webtransport?type=noise', 'https://[2600:3c01::f03c:93ff:fe99:c7bb]:4001/.well-known/libp2p-webtransport?type=noise', 'https://177.190.248.59:4001/.well-known/libp2p-webtransport?type=noise', 'https://[2804:13f0::59]:4001/.well-known/libp2p-webtransport?type=noise', 'https://13.124.123.33:4001/.well-known/libp2p-webtransport?type=noise', 'https://68.178.171.72:4001/.well-known/libp2p-webtransport?type=noise', 'https://185.236.108.204:4001/.well-known/libp2p-webtransport?type=noise', 'https://152.168.173.10:55612/.well-known/libp2p-webtransport?type=noise', 'https://146.59.33.237:4001/.well-known/libp2p-webtransport?type=noise', 'https://[2001:41d0:601:1100::16bc]:4001/.well-known/libp2p-webtransport?type=noise', 'https://103.167.135.94:40707/.well-known/libp2p-webtransport?type=noise', 'https://[240e:82:240e:9200:2486:addb:38c8:d56d]:4001/.well-known/libp2p-webtransport?type=noise', 'https://34.64.160.129:18197/.well-known/libp2p-webtransport?type=noise', 'https://34.64.160.129:4001/.well-known/libp2p-webtransport?type=noise', 'https://34.64.160.129:42179/.well-known/libp2p-webtransport?type=noise', 'https://88.209.206.142:4001/.well-known/libp2p-webtransport?type=noise', 'https://167.86.75.198:4001/.well-known/libp2p-webtransport?type=noise', 'https://207.216.21.251:4001/.well-known/libp2p-webtransport?type=noise', 'https://89.58.11.155:4002/.well-known/libp2p-webtransport?type=noise', 'https://99.29.26.241:4001/.well-known/libp2p-webtransport?type=noise', 'https://154.38.162.255:4001/.well-known/libp2p-webtransport?type=noise', 'https://[2605:a140:2087:4984::1]:4001/.well-known/libp2p-webtransport?type=noise', 'https://23.81.180.18:4001/.well-known/libp2p-webtransport?type=noise', 'https://45.141.84.5:4001/.well-known/libp2p-webtransport?type=noise', 'https://139.178.91.71:4001/.well-known/libp2p-webtransport?type=noise', 'https://[2604:1380:45e3:6e00::1]:4001/.well-known/libp2p-webtransport?type=noise', 'https://147.75.87.27:4001/.well-known/libp2p-webtransport?type=noise', 'https://[2604:1380:4602:5c00::3]:4001/.well-known/libp2p-webtransport?type=noise', 'https://145.40.118.135:4001/.well-known/libp2p-webtransport?type=noise', 'https://[2604:1380:40e1:9c00::1]:4001/.well-known/libp2p-webtransport?type=noise']

const App = async () => {
  const DOM = {
    connectButton: () => document.getElementById('connect-button'),
    outputTotal: () => document.getElementById('output-total'),
    outputSuccess: () => document.getElementById('output-success'),
    outputError: () => document.getElementById('output-error'),
    outputErrors: () => document.getElementById('output-errors'),
    outputTimer: () => document.getElementById('time')
  }

  let total = 0
  let success = 0
  let errored = 0
  const errors = {}

  DOM.connectButton().onclick = async (e) => {
    e.preventDefault()

    DOM.connectButton().disabled = true

    // connect to all 50 WebTransport addresses
    await Promise.all(
      addresses.map(async url => {
        total++
        DOM.outputTotal().innerText = total

        const wt = new WebTransport(url)
        const start = Date.now()

        try {
          await Promise.any([
            wt.ready,
            wt.closed,
            new Promise((resolve, reject) => {
              setTimeout(() => {
                // connection took too long, close the transport
                wt.close()
                reject(new Error('timeout'))
              }, 5000)
            })
          ])

          success++
          DOM.outputSuccess().innerText = success
        } catch (err) {
          errored++
          DOM.outputError().innerText = errored

          const readyErr = err.errors[0]
          errors[readyErr.message] = errors[readyErr.message] ?? 0
          errors[readyErr.message]++

          DOM.outputErrors().innerHTML = Object.entries(errors)
            .map(([message, count]) => `<li>${message}: ${count}</li>`)
            .join('')
        }
      })
    )

    // show a timer for five minutes
    let waitTime = 5 * 60

    while (waitTime > 0) {
      const mins = Math.floor((waitTime / 60) << 0).toString().padStart(2, '0')
      const secs = Math.floor(waitTime % 60).toString().padStart(2, '0')

      DOM.outputTimer().innerHTML = `${mins}:${secs}`

      await new Promise((resolve) => {
        setTimeout(() => {
          waitTime--
          resolve()
        }, 1000)
      })
    }

    DOM.outputTimer().innerHTML = '00:00'
    DOM.connectButton().disabled = undefined
  }
}

App().catch(err => {
  console.error(err) // eslint-disable-line no-console
})
