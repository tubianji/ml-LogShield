import Sidebar from './Sidebar';
import dynamic from 'next/dynamic';
const DashboardArea = dynamic(() => import('./DashboardArea'), {
  ssr: false,
});
import TopNavBar