function TestimonialsSection() {
  return (
    <section className="bg-gray-100 text-gray-950">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid items-center gap-4 xl:grid-cols-5">
          <div className="max-w-2xl mx-auto my-8 space-y-4 text-center xl:col-span-2 xl:text-left">
            <h2 className="text-4xl font-bold">
              What Our Customers Are Saying
            </h2>
            <p className="text-gray-600">
              Our customers have experienced great efficiency and ease in
              managing their company assets. Hear their success stories!
            </p>
          </div>

          <div className="p-6 xl:col-span-3">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-6 rounded shadow-md bg-gray-300">
                <p>
                  "Using XYZ's Asset Management System has revolutionized how we
                  manage both returnable and non-returnable assets. It's
                  incredibly user-friendly, and the dashboard makes tracking
                  everything so simple. Our HR team is now more efficient than
                  ever before!"
                </p>
                <div className="flex items-center mt-4 space-x-4">
                  <img
                    src="/images/portrait1.jpg"
                    alt=""
                    className="w-12 h-12 bg-center bg-cover rounded-full bg-gray-500"
                  />
                  <div>
                    <p className="text-lg font-semibold">Leroy Jenkins</p>
                    <p className="text-sm text-gray-600">CTO of Company Co.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded shadow-md bg-gray-300">
                <p>
                  "We needed a solution to easily track the assets our employees
                  use, and XYZ's platform provided exactly that. The system is
                  intuitive, and the customer support is outstanding. It's a
                  game changer for businesses like ours!"
                </p>
                <div className="flex items-center mt-4 space-x-4">
                  <img
                    src="https://media.istockphoto.com/id/2151713570/photo/diverse-senior-executive-ponders-business-strategy-in-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=W-rPARW826Lkgg_nkgCp95fZPYwQQeFzLyMvNyEtjj8="
                    alt=""
                    className="w-12 h-12 bg-center bg-cover rounded-full bg-gray-500"
                  />
                  <div>
                    <p className="text-lg font-semibold">Jane Doe</p>
                    <p className="text-sm text-gray-600">
                      CEO of Creative Corp.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded shadow-md bg-gray-300">
                <p>
                  "AssetManagement's Management System has streamlined our asset
                  tracking process, making it easy for HR to monitor everything
                  from laptops to office supplies. We can now manage our
                  resources more effectively, and the reports are incredibly
                  insightful."
                </p>
                <div className="flex items-center mt-4 space-x-4">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1669882305273-674eff6567af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
                    alt=""
                    className="w-12 h-12 bg-center bg-cover rounded-full bg-gray-500"
                  />
                  <div>
                    <p className="text-lg font-semibold">Alex Smith</p>
                    <p className="text-sm text-gray-600">
                      COO of Tech Innovate
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded shadow-md bg-gray-300">
                <p>
                  "This tool has helped us maintain a clear overview of our
                  company assets and allowed us to ensure everything is in good
                  condition and returned on time. The interface is clean, and we
                  love how responsive the platform is across all devices!"
                </p>
                <div className="flex items-center mt-4 space-x-4">
                  <img
                    src="https://media.istockphoto.com/id/2075587950/photo/millennial-asian-woman-using-digital-tablet-working-at-home-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=qQgWcLDrf96qxA8-SF_akYG98yo32-tUAUkAxkvse58="
                    alt=""
                    className="w-12 h-12 bg-center bg-cover rounded-full bg-gray-500"
                  />
                  <div>
                    <p className="text-lg font-semibold">Chris Lee</p>
                    <p className="text-sm text-gray-600">
                      Marketing Head at Ads Co.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
