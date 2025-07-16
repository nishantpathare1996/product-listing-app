import { useCallback, useEffect, useState } from "react";
import type { ExtendedProduct, Product, SortingType } from "../types/product";
import Spinner from "../components/Spinner";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [originalProducts, setOriginalProducts] = useState<ExtendedProduct[]>(
    []
  );
  const [inputData, setInputData] = useState("");
  const [sortingOrder, setSortingOrder] = useState<SortingType>("ascending");

  const [averge, setAverage] = useState(0);
  useEffect(() => {
    fetch("https://mocki.io/v1/a4e257fa-675a-4b51-bdb1-d6d4950ef910")
      .then((response) => response.json())
      .then((data: Product[]) => {
        console.log("Products loaded:", data);
        processProductData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.warn("API fetch failed, using local data:", error);
        fetch("/products.json")
          .then((res) => res.json())
          .then((localData: Product[]) => {
            processProductData(localData);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Failed to load local fallback data:", err);
          })
          .finally(() => setLoading(false));
      });

    const processProductData = (data: Product[]) => {
      const sorted = data.sort((a, b) => a.price - b.price);
      setProducts(sorted);
      addMetaDataToObject(data);
      const sum = data.reduce((sum, cur) => sum + cur.price, 0);
      setAverage(sum / data.length);
    };
  }, []);

  const addMetaDataToObject = (data: Product[]) => {
    const newArr = data.map((val) => {
      const nameSplit = val.name.toLowerCase().split(" ");
      const detailsSplit = val.description.toLowerCase().split(" ");
      return { ...val, metaData: [...nameSplit, ...detailsSplit] };
    });
    setOriginalProducts(newArr);
  };

  const sortingFunction = useCallback(
    (sortingType: SortingType) => {
      if (sortingType === sortingOrder) return;
      const sortedProducts = [...products];
      if (sortingType === "ascending") {
        sortedProducts.sort((a: Product, b: Product) => a.price - b.price);
      } else {
        sortedProducts.sort((a: Product, b: Product) => b.price - a.price);
      }
      setProducts(sortedProducts);
      setSortingOrder(sortingType);
    },
    [products, sortingOrder]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputData(inputValue);
    if (inputValue.length === 0) {
      setProducts(originalProducts);
    } else {
      const filteredArray = [...originalProducts].filter((val) => {
        const newArr = val.metaData.map((value) =>
          value.startsWith(inputValue.toLowerCase())
        );
        return newArr.some((val) => val === true) ? true : false;
      });
      setProducts(filteredArray);
    }
  };

  return (
    <div>
      <main>
        <div className="flex flex-col mb-3">
          <h1 className="flex justify-center justify-self-center">Products</h1>

          <div className="flex flex-wrap items-center justify-between w-full gap-4 mt-2 md:px-28">
            <div className="flex-1"></div>
            <input
              placeholder="Search..."
              onChange={(e) => handleInputChange(e)}
              value={inputData}
              className="w-full md:max-w-[350px] border rounded-lg pl-2 py-1  md:w-1/3"
            />

            <div className="flex  justify-center md:justify-end mx-auto md:mx-0   md:w-1/3">
              <button
                onClick={() => {
                  if (sortingOrder === "ascending") {
                    sortingFunction("descending");
                  } else {
                    sortingFunction("ascending");
                  }
                }}
                className="border px-2 py-1 text-sm rounded-md"
              >
                {sortingOrder === "ascending"
                  ? "Sort: High to low"
                  : "Sort: Low to High"}
              </button>
            </div>
          </div>
        </div>
        {products.length === 0 && !loading && (
          <p className="text-3xl text-center mt-10">
            Oops!! We couldn't find what you were looking for.
          </p>
        )}

        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products &&
              products.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
        )}
      </main>
      <footer className="fixed bottom-0 left-0 w-full text-center bg-neutral-700 ">
        <p className="text-center text-gray-400">
          Total products: {originalProducts.length}
        </p>
        <p className="text-center text-gray-400">
          Average price: ${Math.round(averge * 100) / 100}
        </p>
      </footer>
    </div>
  );
}

export default Products;
