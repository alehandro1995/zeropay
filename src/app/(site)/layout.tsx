import Header from "../../components/Header";
import Alert from "../../components/DefaultAlert";

export default function DashboardLayout(
  {children}: 
  {children: React.ReactNode}
) {
  return (
    <section className="min-h-screen min-w-[1200px] relative">
      <Header />
      {children}
      <Alert />
    </section>
  );
}