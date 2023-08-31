import { redirect } from 'next/navigation';
export async function GET() {
    redirect('/api/apiDemo?id=2');
}