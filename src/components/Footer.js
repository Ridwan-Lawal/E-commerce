export function Footer() {
  const date = new Date();
  return (
    <footer className="bg-gray-900 flex items-center  justify-center h-[130px]">
      <p className="text-white text-center tracking-wide font-medium">
        Copyright &copy; Lawal Ridwan {date.getFullYear()}. All rights reserved{" "}
      </p>
    </footer>
  );
}
