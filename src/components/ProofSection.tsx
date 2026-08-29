import React from 'react';
import { PROOF_ITEMS_DATA, BUSINESS_CONFIG } from '../config/business';
import { ShieldCheck } from 'lucide-react';

/**
 * Proof / Credentials Section.
 * Strictly data-driven: Any unverified or missing license/proof items remain hidden.
 */
export const ProofSection: React.FC = () => {
  const verifiedProof = PROOF_ITEMS_DATA.filter((item) => item.verified);

  if (verifiedProof.length === 0 && !BUSINESS_CONFIG.licenseNumber) {
    return null; // Gracefully hidden per instructions until real business data is provided
  }

  return (
    <section className="py-12 bg-white border-b border-[#E5EBE8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {BUSINESS_CONFIG.licenseNumber && (
          <div className="inline-flex items-center gap-2 p-3 bg-[#0F6B5C]/10 rounded-xl text-xs font-bold text-[#0F6B5C]">
            <ShieldCheck className="w-4 h-4" />
            <span>رقم السجل / الترخيص: {BUSINESS_CONFIG.licenseNumber}</span>
          </div>
        )}
      </div>
    </section>
  );
};
