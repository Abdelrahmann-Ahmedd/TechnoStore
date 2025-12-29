import LoginForm from '@/features/LoginForm'
import Link from 'next/link'


export default function page() {
  return (
    <div className='container w-75 m-auto mt-5'>
      <h2 className='mb-5 text-center'>Login</h2>
      <LoginForm />
      <div className='w-100 d-flex justify-content-center mt-2'>
        <Link href="/admin" className="btn btn-primary">Switch To Admin</Link>
      </div>
    </div>
  )
}
