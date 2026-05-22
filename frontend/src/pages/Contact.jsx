import { Mail, PhoneCall, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Contact Support</h1>
          <p className="mt-2 text-sm text-gray-500">
            Need help with your order? Our support team is available 24/7.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">
                <PhoneCall size={20} />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Phone support</h2>
                <p className="text-sm text-gray-500">+234 800 123 4567</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">
                <Mail size={20} />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Email support</h2>
                <p className="text-sm text-gray-500">support@flashio.app</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">
                <MapPin size={20} />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Head office</h2>
                <p className="text-sm text-gray-500">123 Flashio Street, Lagos, Nigeria</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Customer care</h2>
            <p className="mt-2 text-sm text-gray-500">
              For concerns about orders, deliveries, returns and refunds, our team is ready to help.
            </p>
            <button className="mt-4 rounded-3xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600">
              Start live chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
