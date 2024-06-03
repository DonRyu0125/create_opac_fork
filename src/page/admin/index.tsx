import AdminLayout from '@/components/layouts/admin'
import useLocation from '@/hooks/useLocation'

const Admin = () => {
	const params = useLocation()
	const page = params?.get('page')
	return <AdminLayout>Admin</AdminLayout>
}

export default Admin
