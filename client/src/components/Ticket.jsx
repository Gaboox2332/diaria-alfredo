import React from 'react';
import { format } from 'date-fns';

const Ticket = ({ sales, total, ticketId, shiftType }) => {
  return (
    <div className="hidden print:block text-black text-xs w-full max-w-[80mm] font-mono" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
      {/* Header */}
      <div className="text-center mb-2">
        <h2 className="text-3xl mb-1" style={{ fontFamily: '"Bodoni Moda", "Playfair Display", serif', fontWeight: '500', letterSpacing: '0.05em', fontStyle: 'italic' }}>PERFUMERIA SANTIAGO</h2>
        <p className="text-[10px] uppercase border-b border-black border-dashed pb-2 mb-2">
          La Diaria - Sorteo {shiftType || 'DIARIO'}
        </p>
        
        <div className="flex justify-between text-[10px] mb-1">
          <span>FECHA: {format(new Date(), 'dd/MM/yy')}</span>
          <span>HORA: {format(new Date(), 'HH:mm')}</span>
        </div>
        <p className="font-bold text-sm border-b border-black border-dashed pb-2 mb-2">
          TICKET #: {ticketId}
        </p>
      </div>

      {/* Items Header */}
      <div className="grid grid-cols-3 font-bold text-[10px] border-b border-black border-dashed pb-1 mb-1">
         <span className="text-left">NUM</span>
         <span className="text-center">APUESTA</span>
         <span className="text-right">POS. PREMIO</span>
      </div>

      {/* Items List */}
      <div className="space-y-1 mb-3">
        {sales.map((item, idx) => (
           <div key={idx} className="grid grid-cols-3 text-sm items-center">
              <span className="font-bold text-left text-lg">{item.number}</span>
              <span className="text-center">L {item.amount}</span>
              <span className="text-right font-medium text-xs">L {item.amount * 80}</span>
           </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t-2 border-black border-double pt-2 mb-4">
         <div className="flex justify-between text-xl font-black">
            <span>TOTAL:</span>
            <span>L {total}</span>
         </div>
      </div>
      
      {/* Footer */}
      <div className="text-center text-[10px] mt-4 border-t border-black border-dashed pt-2">
        <p className="font-bold">*** NO SE PAGA SIN TICKET ***</p>
        <p className="mt-1">Validez: 3 días calendario</p>
        <p className="mt-1 font-mono text-[8px]">Gracias por su preferencia</p>
      </div>
    </div>
  );
};

export default Ticket;
