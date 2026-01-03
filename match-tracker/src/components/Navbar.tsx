import Link from 'next/link';
import { Home, PlusCircle, List, BarChart2 } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:relative md:border-t-0 md:border-b md:shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-around md:justify-start md:space-x-8 h-16 items-center">
          <Link href="/" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
            <Home className="w-6 h-6" />
            <span className="text-xs md:text-sm font-medium">Dashboard</span>
          </Link>
          
          <Link href="/matches" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
            <List className="w-6 h-6" />
            <span className="text-xs md:text-sm font-medium">History</span>
          </Link>

          <Link href="/add" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
            <PlusCircle className="w-6 h-6" />
            <span className="text-xs md:text-sm font-medium">Add Match</span>
          </Link>

          <Link href="/stats" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
            <BarChart2 className="w-6 h-6" />
            <span className="text-xs md:text-sm font-medium">Stats</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
