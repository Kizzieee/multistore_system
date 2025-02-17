import { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";

const CartQuantityAddMinus = ({ quantity, onChange }) => {
  return (
    <div className="flex items-center border rounded-full px-3 py-1 space-x-3">
      <button onClick={() => onChange(quantity - 1)} className="p-1">
        {quantity > 1 ? <Minus size={20} /> : <Trash2 size={20} />}
      </button>
      <span className="text-lg">{quantity}</span>
      <button onClick={() => onChange(quantity + 1)} className="p-1">
        <Plus size={20} />
      </button>
    </div>
  );
};

export default CartQuantityAddMinus;
