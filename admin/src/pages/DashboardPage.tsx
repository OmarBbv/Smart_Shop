import { Error } from "@/components/error"
import { Loading } from "@/components/loading"
import { Box } from "@/components/ui/Box"
import { Typography } from "@/components/ui/Typography"
import { productService } from "@/services/productService"
import { userService } from "@/services/userService"
import { useQuery } from "@tanstack/react-query"
import { Users, Package, TrendingUp, AlertCircle, CheckCircle, Info } from "lucide-react"

const fetchAllData = async () => {
  const [users, products] = await Promise.all([
    userService.handleAllUser(),
    productService.getAllProducts(),
  ])

  return { users, products }
}

export default function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['allData'],
    queryFn: fetchAllData,
  })

  const latestUser = data?.users?.[data.users.length - 1]
  const latesProduct = data?.products?.data[data.products.data.length - 1]

  if (isLoading) return <Loading />
  if (isError) return <Error />

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Sistem durumu ve istatistikler</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Kullanıcı Kartı */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between h-full">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Kullanıcı</p>
                <p className="text-3xl font-bold text-gray-900">{data?.users?.length || 0}</p>
                {/* <p className="text-sm text-green-600 mt-1">+12% bu ay</p> */}
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Ürün Kartı */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Ürün</p>
                <p className="text-3xl font-bold text-gray-900">{data?.products.data.length || 0}</p>
                <p className="text-sm text-green-600 mt-1">+8% bu ay</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Satış Kartı */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Satış</p>
                <p className="text-3xl font-bold text-gray-900">₺45,230</p>
                <p className="text-sm text-green-600 mt-1">+15% bu ay</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Bilgilendirme Mesajları */}
        <div className="lg:columns-2 space-y-2">
          {/* Sol Kolon - Sistem Durumu */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sistem Durumu</h2>
            <ul className="space-y-3">
              <li className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <p className="font-medium text-green-900">Sunucu Çalışıyor</p>
                  <p className="text-sm text-green-700">Tüm sistemler normal çalışıyor</p>
                </div>
              </li>
              <li className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
                <div>
                  <p className="font-medium text-yellow-900">Bakım Planlandı</p>
                  <p className="text-sm text-yellow-700">Yarın saat 02:00'da bakım yapılacak</p>
                </div>
              </li>
              <li className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Info className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-blue-900">Yeni Özellik</p>
                  <p className="text-sm text-blue-700">Gelişmiş raporlama sistemi aktif</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Sağ Kolon - Son Aktiviteler */}
          <Box className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <Typography component='h2' className="text-lg font-semibold text-gray-900 mb-4">Son Aktiviteler</Typography>
            <Box component='ul' className="space-y-3">
              <li className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Yeni kullanıcı kaydı</p>
                  <p className="text-sm text-gray-600">{latestUser?.email}</p>
                  <p className="text-xs text-gray-500 mt-1">5 dakika önce</p>
                </div>
              </li>
              <li className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                  <Package className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Yeni ürün eklendi</p>
                  <p className="text-sm text-gray-600">{latesProduct?.name}</p>
                  <p className="text-xs text-gray-500 mt-1">15 dakika önce</p>
                </div>
              </li>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  )
}
