import type { ShopifyCollection } from "@/lib/shopify/types";
import { slugify } from "@/lib/utils/textConverter";
import React, { useState, useEffect } from "react";
import { BsCheckLg } from "react-icons/bs";
import ShowTags from "./product/ShowTags";
import RangeSlider from "./rangeSlider/RangeSlider";

const ProductFilters = ({
  categories,
  vendors,
  tags,
  maxPriceData,
  vendorsWithCounts,
  categoriesWithCounts,
}: {
  categories: ShopifyCollection[];
  vendors: { vendor: string; productCount: number }[];
  tags: string[];
  maxPriceData: { amount: string; currencyCode: string };
  vendorsWithCounts: { vendor: string; productCount: number }[];
  categoriesWithCounts: { category: string; productCount: number }[];
}) => {
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSearchParams(new URLSearchParams(window.location.search));
    }
  }, []);

  if (!searchParams) {
    return <div>Cargando filtros...</div>; // Renderiza algo mientras los datos se inicializan
  }

  const selectedBrands = searchParams.getAll("b");
  const selectedCategory = searchParams.get("c");

  const updateSearchParams = (newParams: URLSearchParams) => {
    const newUrl = `${window.location.pathname}?${newParams.toString()}`;
    window.history.pushState({}, "", newUrl);
    setSearchParams(new URLSearchParams(newUrl));
  };

  const handleBrandClick = (name: string) => {
    const slugName = slugify(name.toLowerCase());
    const newParams = new URLSearchParams(searchParams.toString());

    const currentBrands = newParams.getAll("b");

    if (currentBrands.includes(slugName)) {
      newParams.delete("b");
    } else {
      newParams.append("b", slugName);
    }
    updateSearchParams(newParams);
  };

  const handleCategoryClick = (handle: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (handle === selectedCategory) {
      newParams.delete("c");
    } else {
      newParams.set("c", handle);
    }
    updateSearchParams(newParams);
  };

  return (
    <div>
      <div>
        <h5 className="mb-2 lg:text-xl">Select Price Range</h5>
        <hr className="dark:border-darkmode-border" />
        <div className="pt-4">
          <RangeSlider maxPriceData={maxPriceData} />
        </div>
      </div>

      <div>
        <h5 className="mb-2 mt-4 lg:mt-6 lg:text-xl">Product Categories</h5>
        <hr className="dark:border-darkmode-border" />
        <ul className="mt-4 space-y-4">
          {categories.map((category) => (
            <li
              key={category.handle}
              className={`flex items-center justify-between cursor-pointer ${
                selectedCategory === category.handle
                  ? "text-dark dark:text-darkmode-dark font-semibold"
                  : "text-light dark:text-darkmode-light"
              }`}
              onClick={() => handleCategoryClick(category.handle)}
            >
              {category.title}
              <span>
                {categoriesWithCounts.length > 0
                  ? `(${categoriesWithCounts.find(
                      (c) => c.category === category.title
                    )?.productCount || 0})`
                  : `(${category?.products?.edges.length || 0})`}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {vendors && (
        <div>
          <h5 className="mb-2 mt-8 lg:mt-10 lg:text-xl">Brands</h5>
          <hr className="dark:border-darkmode-border" />
          <ul className="mt-4 space-y-4">
            {vendors.map((vendor) => (
              <li
                key={vendor.vendor}
                className={`flex items-center justify-between cursor-pointer text-light dark:text-darkmode-light`}
                onClick={() => handleBrandClick(vendor.vendor)}
              >
                <span>
                  {vendorsWithCounts.length > 0
                    ? `${vendor.vendor} (${vendorsWithCounts.find(
                        (v) => v.vendor === vendor.vendor
                      )?.productCount || 0})`
                    : `${vendor.vendor} (${vendor.productCount})`}
                </span>
                <div className="h-4 w-4 rounded-sm flex items-center justify-center border border-light dark:border-darkmode-light">
                  {selectedBrands.includes(slugify(vendor.vendor.toLowerCase())) && (
                    <BsCheckLg size={16} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tags.length > 0 && (
        <div>
          <h5 className="mb-2 mt-8 lg:mt-10 lg:text-xl">Tags</h5>
          <hr className="dark:border-darkmode-border" />
          <div className="mt-4">
            <ShowTags tags={tags} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
