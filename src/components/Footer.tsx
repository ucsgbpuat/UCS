"use client";

import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer id="contact" className="bg-espresso py-16 border-t border-espresso-light/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-butter/10 flex items-center justify-center border border-butter/30">
                <img src="https://pub-b9cd201fbde6424783fdf034160caaab.r2.dev/ucs/logo.webp" alt="Logo" />
              </div>
              <span className="font-display text-xl text-butter">University Cultural Society</span>
            </div>
            <p className="text-butter/70 text-sm leading-relaxed mb-6">
              Celebrating the spirit of Indian culture through dance, music, and art at our university.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/ucs_gbpuat/" className="w-10 h-10 rounded-full bg-butter/10 flex items-center justify-center text-butter/70 hover:text-butter hover:bg-butter/20 transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61585082004930" className="w-10 h-10 rounded-full bg-butter/10 flex items-center justify-center text-butter/70 hover:text-butter hover:bg-butter/20 transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links (Empty in original but let's keep it to preserve UI layout) */}
          <div>
          </div>

          {/* Art Forms (Empty in original but let's keep it to preserve UI layout) */}
          <div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-butter mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-butter/80 mt-0.5 shrink-0" />
                <span className="text-butter/60 text-sm">
                  Govind Ballabh Pant University of Agriculture and Technology
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-butter/80 shrink-0" />
                <a href="mailto:ucs.gbpuat123@gmail.com" className="text-butter/60 hover:text-butter transition-colors text-sm">
                  ucs.gbpuat123@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-butter/80 shrink-0" />
                <a href="tel:+919389954163" className="text-butter/60 hover:text-butter transition-colors text-sm">
                  +91 9389954163
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-butter/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-butter/60 text-sm">
            © 2026 University Cultural Society. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-butter/60 hover:text-butter transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-butter/60 hover:text-butter transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
