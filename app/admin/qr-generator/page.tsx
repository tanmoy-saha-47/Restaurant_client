'use client'

import { useState } from "react"
import { QRCodeCanvas } from 'qrcode.react'

type QrCodeInfo = {
    tableNumber: number
    url: string
}

export default function QRGeneratorPage() {
    const [baseUrl, setBaseUrl] = useState('http://localhost:3000')
    const [totalTables, setTotalTables] = useState(10)

    const [qrCodes, setQrCodes] = useState<QrCodeInfo[]>([])

    //function to generate urls 
    const generateCodes = () => {
        const codes: QrCodeInfo[] = []
        for (let i = 1; i <= totalTables; i++) {
            codes.push({
                tableNumber: i,
                url: `${baseUrl}/start?table=${i}`,
            })
        }
        setQrCodes(codes)
    }

    //function for downloading QR code
    const downloadQRCode = (tableNumber: number) => {
        const canvas = document.getElementById(`qr-code-${tableNumber}`) as HTMLCanvasElement
        if (canvas) {
            const pngUrl = canvas
                .toDataURL('image/png')
                .replace("image/png", 'image/octet-stream')
            let downloadLink = document.createElement('a')
            downloadLink.href = pngUrl
            downloadLink.download = `table-${tableNumber}-qrcode.png`
            document.body.appendChild(downloadLink)
            downloadLink.click()
            downloadLink.removeChild(downloadLink)
        }
    }

    return (
        <div className="p-2 rem ">
            <h1 className=" text-center mb-7">QR Code Generator</h1>

            <div className="flex flex-col gap-6 mb-7 p-7 border-black no-print">
                <div>
                    <label >Your Website Base URL: </label>
                    <input
                        type="text"
                        value={baseUrl}
                        onChange={(e) => setBaseUrl(e.target.value)}
                        className="p-2 w-md border-2"
                    />
                </div>
                <div>
                    <label> Total Number of Tables:</label>
                    <input
                        type="text"
                        value={totalTables}
                        onChange={(e) => setTotalTables(Number(e.target.value))}
                        className="p-2 w-md border-2"
                    />
                </div>
                <button
                    onClick={generateCodes}
                    className="px-3 py-6 cursor-pointer bg-blue-500 text-white border-none rounded-md text-2xl"
                >
                    Generate QR codes
                </button>
                <button onClick={() => window.print()}
                    className="px-3 py-6 cursor-pointer bg-blue-700 text-black border-none rounded-md text-2xl"
                >
                    Print All
                </button>
            </div>

            {/* QR code display */}
            <div className="flex flex-wrap gap-8 justify-center">
                {qrCodes.map(({ tableNumber, url }) => (
                    <div key={tableNumber}
                        className="flex flex-col items-center gap-4 p-4 border-2 border-black rounded-lg"
                    >
                        <h3 className="m-0">Table {tableNumber} </h3>
                        <QRCodeCanvas
                            id={`qr-code-${tableNumber}`}
                            value={url}
                            size={150}
                            level={'H'}
                        />
                        <button onClick={() => downloadQRCode(tableNumber)}
                            className="px-2 py-4 cursor-pointer bg-amber-600 text-black border-none rounded-md"
                        >
                            Download PNG
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}