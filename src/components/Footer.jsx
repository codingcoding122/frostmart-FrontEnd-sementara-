function Footer() {
  return (
    <footer className="bg-blue-900 text-white px-10 py-20">

      <div className="grid grid-cols-4 gap-10 border-b border-white/20 pb-14">

        {/* LOGO */}
        <div>

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              ❄
            </div>

            <h2 className="text-3xl font-bold">
              FrostMart
            </h2>

          </div>

          <p className="text-lg leading-relaxed text-gray-200">
            Jalan Semangka Raya, Telaga Murni,
            Cikarang Barat, Kab. Bekasi
          </p>

        </div>

        {/* COMPANY */}
        <div>

          <h3 className="font-bold text-2xl mb-6">
            Company
          </h3>

          <ul className="space-y-4 text-gray-200 text-lg">

            <li>About Us</li>
            <li>Career</li>
            <li>How It Work</li>

          </ul>

        </div>

        {/* POLICY */}
        <div>

          <h3 className="font-bold text-2xl mb-6">
            Policy
          </h3>

          <ul className="space-y-4 text-gray-200 text-lg">

            <li>FAQ</li>
            <li>Privacy</li>
            <li>Shipping</li>

          </ul>

        </div>

        {/* CONTACT */}
        <div>

          <h3 className="font-bold text-2xl mb-6">
            Get In Touch
          </h3>

          <ul className="space-y-4 text-gray-200 text-lg">

            <li>+62 896 7311 2766</li>
            <li>food@example.com</li>

          </ul>

        </div>

      </div>

      <p className="text-center text-gray-300 mt-10 text-lg">
        © 2022 Let’sFood. ALL RIGHT RESERVED.
      </p>

    </footer>
  );
}

export default Footer;  