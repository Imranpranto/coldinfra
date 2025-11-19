import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Request - ColdInfra | Cold Email Infrastructure',
  description: 'Submit an order request for ColdInfra cold email infrastructure services. Get a custom quote within 24 hours.',
  openGraph: {
    title: 'Order Request - ColdInfra',
    description: 'Submit an order request for ColdInfra cold email infrastructure services.',
    type: 'website',
  },
}

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
