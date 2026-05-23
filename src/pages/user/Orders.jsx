import ProfileSidebar from "../../components/ProfileSidebar";

function Orders() {
  const orders = [
    {
      id: "TRX001",
      date: "2026-04-16",
      item: "2x Chicken Nugget Original",
      total: "Rp69.000",
    },
    {
      id: "TRX002",
      date: "2026-04-17",
      item: "1x Chicken Karage",
      total: "Rp45.000",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-700 p-10">
      <div className="max-w-7xl mx-auto flex gap-8">

        <ProfileSidebar />

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-8 text-white">
            Pesanan Saya
          </h1>

          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-xl">
                      Order #{order.id}
                    </h3>

                    <p className="text-gray-500">
                      {order.date}
                    </p>
                  </div>

                  <h2 className="text-blue-700 font-bold text-2xl">
                    {order.total}
                  </h2>
                </div>

                <div className="mt-8 border-b pb-6">
                  <p className="text-lg text-gray-700">
                    {order.item}
                  </p>
                </div>

                <p className="mt-5 text-gray-500">
                  Kurir Gosend Instan
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Orders;