import { Link } from "react-router-dom";

import nuggetImage from "../../assets/images/products//chiken nugget fiesta.jpg";
import karageImage from "../../assets/images/products//karage fiesta.jpg";
import sosis_sapiImage from "../../assets/images/products//sosis sapi fiesta.jpg";
import bakso_ikanImage from "../../assets/images/products//bakso ikan shifudo.jpg";
import otakotak_ikanImage from "../../assets/images/products//otak otak ikan.jpg";
import sausageImage from "../../assets/images/products//chiken sausage.jpg";
import chiken_nuggetImage from "../../assets/images/products//nugget kenzler.jpg";
import siomayImage from "../../assets/images/products//siomay frozen.jpg";


export default function FrostmartHomePage() {
  const products = [
    {
      name: "Chicken Nugget",
      brand: "Fiesta",
      image: nuggetImage,
    },
    {
      name: "Chicken Karage",
      brand: "Fiesta",
      image: karageImage,
    },    
    {
      name: "Sosis Sapi",
      brand: "Fiesta",
      image: sosis_sapiImage,
    },
    {
      name: "Bakso Ikan",
      brand: "Shifudo",
      image: bakso_ikanImage,
    },
  ];

  const menuProducts = [
    {
      name: "Otak-otak ikan",
      brand: "Cedea",
      price: "25.000",
      image: otakotak_ikanImage
    },
    {
      name: "Chicken Sausage Fiesta",
      brand: "Fiesta",
      price: "45.000",
      image: sausageImage
     },
    {
      name: "Chicken Nugget",
      brand: " Kanzler",
      price: "40.000",
      image:chiken_nuggetImage,
    },
    {
      name: "Siomay Frozen",
      brand: "First Grade GO",
      price: "30.000",
      image:siomayImage
    },
  ];

  return (
    <div className="bg-[#f5f5f5] text-gray-800 overflow-hidden">
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#55a8ea] to-[#3a32ff] min-h-[700px] px-10 py-16 flex items-center justify-between">
        <div className="max-w-xl text-white">
          <h1 className="text-7xl font-bold leading-tight mb-8">
            Be The Fastest In Delivery Your Food
          </h1>

          <p className="text-lg mb-8 text-gray-100">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet
          </p>

          <button className="bg-[#251c7a] px-8 py-4 rounded-full font-semibold">
            Get Started
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {products.map((item, index) => (
            <div
              key={index}
              className="bg-white w-[260px] rounded-2xl pt-20 pb-8 px-6 relative shadow-xl"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 rounded-full object-cover absolute -top-10 left-1/2 -translate-x-1/2 shadow-lg"
              />

              <div className="text-center mt-12">
                <h2 className="text-2xl font-bold">{item.name}</h2>
                <p className="text-gray-500 mt-1">By {item.brand}</p>
                <p className="text-yellow-400 mt-3 text-xl">★★★★★</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT WE SERVE */}
      <section className="py-28 px-10 bg-[#f8f8f8] text-center">
        <p className="text-orange-400 font-semibold text-xl mb-4">
          How it works
        </p>

        <h2 className="text-5xl font-bold mb-6">What We Serve</h2>

        <p className="text-gray-500 text-xl max-w-3xl mx-auto mb-20">
          Product Quality Is Our Priority, And Always Guarantees Halal And
          Safety Until It Is In Your Hands.
        </p>

        <div className="grid grid-cols-3 gap-10">
          <div className="flex flex-col items-center">
            <div className="text-8xl mb-6">📱</div>
            <h3 className="text-3xl font-bold mb-4">Easy To Order</h3>
            <p className="text-gray-500 text-xl">
              You only order through the app
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-8xl mb-6">🛵</div>
            <h3 className="text-3xl font-bold mb-4">Fastest Delivery</h3>
            <p className="text-gray-500 text-xl">
              Delivery will be on time
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-8xl mb-6">📦</div>
            <h3 className="text-3xl font-bold mb-4">Best Quality</h3>
            <p className="text-gray-500 text-xl">
              The best quality of food for you
            </p>
          </div>
        </div>
      </section>

      {/* DISCOUNT SECTION */}
      <section
        className="h-[500px] bg-cover bg-center relative flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1615937691194-97dbd3f3dc29?q=80&w=800&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative text-center text-white">
          <h2 className="text-6xl font-bold mb-10 max-w-4xl leading-tight">
            Join our member and get discount up to 50%
          </h2>

          <Link to="/login">
           <button
            className="
              bg-blue-900
              hover:bg-blue-700
              active:scale-95
              transition-all
              duration-200
              text-white
              px-6
              py-3
              rounded-full
            "
          >
            Sign Up
           </button>
          </Link>
        </div>
      </section>

      {/* POPULAR MENU */}
      <section className="py-28 px-10 text-center bg-[#f8f8f8]">
        <p className="text-blue-700 font-semibold text-xl mb-4">Our menu</p>

        <h2 className="text-5xl font-bold mb-6">
          Our Popular Menu Frozen Food
        </h2>

        <p className="text-gray-500 text-xl mb-20">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam
        </p>

        <div className="grid grid-cols-4 gap-8 mb-14">
          {menuProducts.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-md relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-40 h-40 object-cover rounded-full mx-auto mb-6"
              />

              <h3 className="text-2xl font-bold">{item.name}</h3>

              <p className="text-gray-500 mt-2">By {item.brand}</p>

              <p className="font-bold text-xl mt-4">RP: {item.price}</p>

              <span className="absolute bottom-5 right-5 text-yellow-500 text-2xl">
                ♥
              </span>
            </div>
          ))}
        </div>

        <button className="bg-blue-700 text-white px-10 py-4 rounded-full text-lg font-semibold">
          More Menu
        </button>
      </section>

      {/* TESTIMONI */}
      <section className="px-10 pb-28 bg-[#f8f8f8]">
        <div className="grid grid-cols-2 gap-10 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop"
              alt="frozen"
              className="rounded-3xl h-[500px] w-full object-cover"
            />
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-300"></div>

                <div>
                  <h3 className="font-bold text-2xl">Hans</h3>
                  <p className="text-yellow-400 text-xl">★★★★★</p>
                </div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                “Di aplikasi ini sangat rekomen banget untuk kalian yang mau
                pesan Frozen Food tanpa ribet keluar Rumah.”
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md ml-24">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-300"></div>

                <div>
                  <h3 className="font-bold text-2xl">Naura Silvana</h3>
                  <p className="text-yellow-400 text-xl">★★★★★</p>
                </div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                “Keren banget aplikasinya, buat kaum mager cocok nih!!”
              </p>
            </div>
          </div>
        </div>
      </section>
          </div>
  );
}
