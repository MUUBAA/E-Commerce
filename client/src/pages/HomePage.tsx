// HomePage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/stores";
import { fetchAllProducts } from "../../redux/thunk/product";
import ProductCarousel from "../components/ProductCarousel";
import type { Product } from "../../redux/slices/productsSlice";

interface UiCategory {
  name: string;
  imageUrl: string;
  route: string;
}

const uiCategories: UiCategory[] = [
  { name: "Fruits & Vegetables", imageUrl: "https://res.cloudinary.com/dulie41id/image/upload/v1762506139/fruits_vegtables_nduscl.png", route: "/fresh" },
  { name: "Rices & Oils", imageUrl: "https://res.cloudinary.com/dulie41id/image/upload/v1762506139/Atta_rice_oils_y8xqnw.png", route: "/rice" },
  { name: "Atta & Dals", imageUrl: "https://res.cloudinary.com/dulie41id/image/upload/v1763705568/organic_tatava_eotml9.webp", route: "/dal-pulses" },
  { name: "Spices & Seasonings", imageUrl: "https://res.cloudinary.com/dulie41id/image/upload/v1762581704/Masala_dry_fruits_lo639d.png", route: "/spices-seasonings" },
  { name: "Chips & Crisps", imageUrl: "https://res.cloudinary.com/dulie41id/image/upload/v1763705102/munchies_ms4r6c.png", route: "/chips-crisps" },
  { name: "Nest Cafe", imageUrl: "https://res.cloudinary.com/dulie41id/image/upload/v1762581731/nest_cafe_wbby2v.png", route: "/cafe" },
  { name: "Juices & Healthy Drinks", imageUrl: "https://res.cloudinary.com/dulie41id/image/upload/v1763705012/juices_cwza5z.png ", route: "/juices-healthy-drinks" },
  { name: "Salt, Sugar & Jaggery", imageUrl: "https://res.cloudinary.com/dulie41id/image/upload/v1762581878/pure_jaggery_kvezgk.webp", route: "/salt-sugar-jaggery" },
];

// 👇 These are the “old homepage rows” with their own categoryIds + routes
interface HomeSection {
  title: string;
  categoryId: number;
  seeAllRoute: string;
}

const homeSections: HomeSection[] = [
  { title: "Fruits & Vegetables", categoryId: 1, seeAllRoute: "/fresh" },
  { title: "Rice",            categoryId: 3,  seeAllRoute: "/rice" },
  { title: "Dal & Pulses",    categoryId: 2, seeAllRoute: "/dal-pulses" },
  { title: "Spices & Seasonings", categoryId: 5,  seeAllRoute: "/spices-seasonings" },
  { title: "Chips & Crisps",  categoryId: 7, seeAllRoute: "/chips-crisps" },
  { title: "Juices & Healthy Drinks", categoryId: 8, seeAllRoute: "/juices-healthy-drinks" },
  { title: "Salt, Sugar & Jaggery", categoryId: 6, seeAllRoute: "/salt-sugar-jaggery" },
  // 👆 adjust categoryId values to match your backend
];

type HomeProduct = {
  id: number;
  itemName: string;
  itemPrice: string;
  originalPrice?: string;
  itemUrl: string;
  discount?: string;
};

const transformProduct = (p: Product): HomeProduct => {
  const price = p.itemPrice ?? 0;
  return {
    id: p.id,
    itemName: p.itemName,
    itemPrice: `₹${price}`,
    originalPrice: price > 0 ? `₹${Math.round(price * 1.2)}` : undefined,
    discount: price > 0 ? `₹${Math.round(price * 0.2)} OFF` : undefined,
    itemUrl: p.itemUrl,
  };
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // store products for each *section* (not uiCategory) by categoryId
  const [sectionProducts, setSectionProducts] = useState<Record<number, HomeProduct[]>>({});
  const [loadingSections, setLoadingSections] = useState(false);

  useEffect(() => {
    const fetchAllSectionProducts = async () => {
      setLoadingSections(true);
      const results: Record<number, HomeProduct[]> = {};

      await Promise.all(
        homeSections.map(async (section) => {
          try {
            const payload = {
              categoryId: section.categoryId,
              itemsPerPage: 20,
              totalItems: 0,
              totalPages: 0,
              currentPage: 0,
            };
            const response: any = await dispatch(fetchAllProducts(payload));

            if (response.meta?.requestStatus === "fulfilled") {
              const raw = Array.isArray(response.payload)
                ? response.payload
                : response.payload?.items || [];
              results[section.categoryId] = (raw as Product[]).map(transformProduct);
            } else {
              results[section.categoryId] = [];
            }
          } catch {
            results[section.categoryId] = [];
          }
        })
      );

      setSectionProducts(results);
      setLoadingSections(false);
    };

    fetchAllSectionProducts();
  }, [dispatch]);

  const handleCategoryClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="bg-gray-50 p-2 pb-24 md:p-4">
      {/* Hero Banner */}
      <div className="mb-4 flex items-center justify-between rounded-2xl bg-pink-50 p-4 shadow-sm">
        <div className="flex-1">
          <h2 className="text-2xl font-bold md:text-3xl">
            Get Groceries <br /> at <span className="text-red-600">₹0</span>{" "}
            Convenience Fee
          </h2>
          <p className="mt-2 text-gray-600">
            Get fruits, veggies, dairy & more delivered fast!
          </p>

          <button
            className="mt-4 cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-bold text-white transition-transform hover:scale-105"
            onClick={() => navigate("/")}
          >
            Order now
          </button>
        </div>
      </div>

      {/* Zepto Experience Banner */}
      <div className="mb-4 rounded-2xl bg-purple-50 p-4 text-center shadow-sm">
        <h3 className="font-bold text-purple-800">ALL NEW NEST EXPERIENCE</h3>
        <div className="mt-2 flex justify-around">
          <div>
            <p className="text-2xl font-bold md:text-3xl">₹0 FEES</p>
            <p className="text-sm text-gray-600">Free delivery unlocked</p>
          </div>
          <div>
            <p className="text-2xl font-bold md:text-3xl">LOWEST PRICES</p>
            <p className="text-sm text-gray-600">EVERYDAY</p>
          </div>
        </div>
      </div>

      {/* Categories icons grid (old UX) */}
      <div className="mb-4">
        <h2 className="mb-2 text-xl font-bold md:text-2xl">Categories</h2>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10">
          {uiCategories.map((category) => (
            <div
              key={category.name}
              className="cursor-pointer text-center transition-transform hover:scale-105"
              onClick={() => handleCategoryClick(category.route)}
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="mx-auto h-20 w-20 object-contain md:h-24 md:w-24"
              />
              <p className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-medium text-gray-700 md:text-sm">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Product carousels (old "Rice", "Dal & Pulses" sections) */}
      {loadingSections && (
        <div className="flex justify-center items-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-purple-600" />
        </div>
      )}

      {!loadingSections &&
        homeSections.map((section) => (
          <ProductCarousel
            key={section.categoryId}
            title={section.title}
            seeAllRoute={section.seeAllRoute} // ✅ uses old route
            products={sectionProducts[section.categoryId] ?? []}
          />
        ))}
    </div>
  );
};

export default HomePage;
