import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/dataTable/data-table";
import { columns } from "@/components/dataTable/columns";
import ShoppingListModal from "@/components/custom/ShoppingListModal";

export default function ShoppingList() {
  const { toast } = useToast();
  const [shoppingList, setShoppingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchShoppingList = async () => {
    try {
      const response = await fetch("/api/shopping/");

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }

      const data = await response.json();
      setShoppingList(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch shopping list. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShoppingList();
  }, []);

  return (
    <div className="px-12">
      {isLoading ? <p>Loading...</p> : <DataTable columns={columns} data={shoppingList} />}
      <ShoppingListModal />
    </div>
  );
}
