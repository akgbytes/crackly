import type { FC, ReactNode } from "react";
import { LuX } from "react-icons/lu";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Drawer: FC<DrawerProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed top-[64px] right-0 z-40 h-[calc(100dvh-64px)] w-full md:w-[40vw] p-4 overflow-y-auto transition-transform bg-white shadow-2xl shadow-cyan-800/10 border-l border-gray-200 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      tabIndex={-1}
      aria-labelledby="drawer-right-label"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5
          id="drawer-right-label"
          className="text-base font-semibold text-black"
        >
          {title}
        </h5>

        <button
          onClick={onClose}
          aria-label="Close Drawer"
          className="text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center"
        >
          <LuX className="text-lg" />
        </button>
      </div>

      {/* Content */}
      <div className="text-sm mx-3 mb-6">{children}</div>
    </div>
  );
};

export default Drawer;
