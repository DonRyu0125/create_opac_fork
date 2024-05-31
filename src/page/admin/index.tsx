import AdminLayout from '@/components/layouts/AdminLayout'
import useLocation from '@/hooks/useLocation'

const Admin = () => {
  const params = useLocation();
 const page = params?.get('page')
	return (
    <AdminLayout>
      Admin
    </AdminLayout>
	)
}

export default Admin
