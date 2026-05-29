function Analytics() {

  const products = [
    {
      name: "Chicken Nugget Crispy",
      views: "1.250",
    },
    {
      name: "Beef Sausage Premium",
      views: "1.120",
    },
    {
      name: "Chicken Katsu Frozen",
      views: "980",
    },
    {
      name: "Fish Roll Original",
      views: "870",
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* CONTENT */}
      <div>

        <h1 className="text-5xl font-bold text-gray-800">
          Analytics
        </h1>

        <p className="text-gray-500 mb-8">
          Welcome back, Admin.
        </p>

        {/* CARDS */}
        <div className="grid grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-3xl p-6 shadow">

            <p className="text-gray-400 mb-2">
              Page Views
            </p>

            <h1 className="text-5xl font-bold">
              2.213
            </h1>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow">

            <p className="text-gray-400 mb-2">
              Total Orders per Day
            </p>

            <h1 className="text-5xl font-bold">
              16
            </h1>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow">

            <p className="text-gray-400 mb-2">
              Total Orders per Month
            </p>

            <h1 className="text-5xl font-bold">
              184
            </h1>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow">

            <p className="text-gray-400 mb-2">
              Avg Session
            </p>

            <h1 className="text-4xl font-bold">
              6 Minutes
            </h1>

          </div>

        </div>

        {/* OVERVIEW */}
        <div className="bg-white rounded-3xl p-8 shadow mb-8">

          <h2 className="text-3xl font-bold mb-6">
            Analytics Overview
          </h2>

          <div className="grid grid-cols-5 gap-4">

            <div className="bg-blue-100 rounded-2xl p-6 text-center">

              <h1 className="text-4xl font-bold text-blue-900">
                5
              </h1>

              <p className="text-gray-600 mt-2">
                Day 1
              </p>

            </div>

            <div className="bg-blue-100 rounded-2xl p-6 text-center">

              <h1 className="text-4xl font-bold text-blue-900">
                6
              </h1>

              <p className="text-gray-600 mt-2">
                Day 2
              </p>

            </div>

            <div className="bg-blue-100 rounded-2xl p-6 text-center">

              <h1 className="text-4xl font-bold text-blue-900">
                10
              </h1>

              <p className="text-gray-600 mt-2">
                Day 3
              </p>

            </div>

            <div className="bg-blue-100 rounded-2xl p-6 text-center">

              <h1 className="text-4xl font-bold text-blue-900">
                10
              </h1>

              <p className="text-gray-600 mt-2">
                Day 4
              </p>

            </div>

            <div className="bg-blue-100 rounded-2xl p-6 text-center">

              <h1 className="text-4xl font-bold text-blue-900">
                16
              </h1>

              <p className="text-gray-600 mt-2">
                Day 5
              </p>

            </div>

          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl p-8 shadow">

          <h2 className="text-3xl font-bold mb-6">
            Top Products
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b text-left">

                <th className="pb-4">
                  Products
                </th>

                <th className="pb-4">
                  Views
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map((item, index) => (
                <tr
                  key={index}
                  className="border-b"
                >

                  <td className="py-4">
                    {item.name}
                  </td>

                  <td>
                    {item.views}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default Analytics;