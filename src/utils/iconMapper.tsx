import {
  ShoppingCart,
  Film,
  Car,
  Utensils,
  ShoppingBag,
  Zap,
  Tag,
} from "lucide-react";

export const renderCategoryIcon = (iconName: string, className = "w-5 h-5") => {
  switch (iconName) {
    case "shopping-cart":
      return <ShoppingCart className={className} />;
    case "film":
      return <Film className={className} />;
    case "car":
      return <Car className={className} />;
    case "utensils":
      return <Utensils className={className} />;
    case "shopping-bag":
      return <ShoppingBag className={className} />;
    case "zap":
      return <Zap className={className} />;
    default:
      return <Tag className={className} />;
  }
};
