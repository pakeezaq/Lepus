import PDFDocument from 'pdfkit'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ensure invoices directory exists
const invoicesDir = path.join(__dirname, '../../invoices')
if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir, { recursive: true })
}

export const generateInvoicePDF = (orderData) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50 })
            const filename = `invoice-${orderData.orderId}.pdf`
            const filePath = path.join(invoicesDir, filename)
            const stream = fs.createWriteStream(filePath)

            doc.pipe(stream)

            // Header
            doc
                .fontSize(20)
                .text('Lepus.', { align: 'center' })
                .moveDown()
                .fontSize(12)
                .text('INVOICE', { align: 'center' })
                .moveDown()

            // Order Info
            doc
                .fontSize(10)
                .text(`Order ID: ${orderData.orderId}`, { align: 'right' })
                .text(`Date: ${new Date(orderData.orderDate).toLocaleDateString()}`, { align: 'right' })
                .moveDown()

            // Customer Details
            doc
                .text('Bill To:', { underline: true })
                .text(`${orderData.customer.firstName} ${orderData.customer.lastName}`)
                .text(orderData.customer.address)
                .text(`${orderData.customer.city}, ${orderData.customer.postalCode}`)
                .text(orderData.customer.phone)
                .text(orderData.customer.email)
                .moveDown()

            // Items Table Header
            const tableTop = 250
            doc.font('Helvetica-Bold')
            doc.text('Item', 50, tableTop)
            doc.text('Quantity', 300, tableTop)
            doc.text('Price', 370, tableTop)
            doc.text('Total', 450, tableTop)
            doc.font('Helvetica')

            let y = tableTop + 25

            // Items
            orderData.items.forEach(item => {
                const itemTotal = item.price * item.quantity
                doc.text(`${item.name} ${item.size ? `(${item.size})` : ''}`, 50, y)
                doc.text(item.quantity.toString(), 300, y)
                doc.text(`Rs ${item.price.toLocaleString()}`, 370, y)
                doc.text(`Rs ${itemTotal.toLocaleString()}`, 450, y, { align: 'right' })
                y += 20
            })

            doc.moveDown()

            // Totals
            const subtotalY = y + 20
            doc.text(`Subtotal: Rs ${orderData.subtotal.toLocaleString()}`, 350, subtotalY, { align: 'right' })
            doc.text(`Shipping: Rs ${orderData.shipping.toLocaleString()}`, 350, subtotalY + 15, { align: 'right' })

            doc.font('Helvetica-Bold')
            doc.text(`Total: Rs ${orderData.total.toLocaleString()}`, 350, subtotalY + 35, { align: 'right' })

            doc.end()

            stream.on('finish', () => {
                resolve({
                    filePath,
                    filename
                })
            })

            stream.on('error', (err) => {
                reject(err)
            })

        } catch (error) {
            reject(error)
        }
    })
}
