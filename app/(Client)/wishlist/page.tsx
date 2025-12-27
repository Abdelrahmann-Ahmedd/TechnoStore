import WishListView from '@/components/Sections/WishlistView'
import ProtectedRoute from '@/features/ProtectedRoute'


export default function page() {
    return (
        <ProtectedRoute>
            <WishListView />
        </ProtectedRoute>
    )
}
