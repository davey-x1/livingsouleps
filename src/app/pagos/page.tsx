"use client";
import { Suspense, useEffect, useState } from 'react';
import styles from './pagos.module.css';
import { useSearchParams } from "next/navigation";
import { IconCircleDashedCheck, IconCircleDashedMinus, IconCircleDashedX, IconPrinter } from '@tabler/icons-react';
import Link from 'next/link';


interface EpaycoTransaction {
  x_cust_id_cliente: number;
  x_ref_payco: number;
  x_id_factura: string;
  x_id_invoice: string;
  x_description: string;
  x_mpd_points: number;
  x_amount: number;
  x_amount_country: number;
  x_amount_ok: number;
  x_tax: number;
  x_tax_ico: number;
  x_amount_base: number;
  x_currency_code: string;
  x_bank_name: string;
  x_cardnumber: string;
  x_quotas: string;
  x_respuesta: string;
  x_response: string;
  x_approval_code: string;
  x_transaction_id: string;
  x_fecha_transaccion: string;
  x_transaction_date: string;
  x_cod_respuesta: number;
  x_cod_response: number;
  x_response_reason_text: string;
  x_cod_transaction_state: number;
  x_transaction_state: string;
  x_errorcode: string;
  x_franchise: string;
  x_business: string;
  x_customer_doctype: string;
  x_customer_document: string;
  x_customer_name: string;
  x_customer_lastname: string;
  x_customer_email: string;
  x_customer_phone: string;
  x_customer_movil: string;
  x_customer_ind_pais: string;
  x_customer_country: string;
  x_customer_city: string;
  x_customer_address: string;
  x_customer_ip: string;
  x_signature: string;
  x_test_request: string;
  x_transaction_cycle: string;
  x_extra1: string;
  x_extra2: string;
  x_extra3: string;
  x_extra4: string;
  x_extra5: string;
  x_extra6: string;
  x_extra7: string;
  x_extra8: string;
  x_extra9: string;
  x_extra10: string;
  x_type_payment: string;
  x_secondary_step: string;
}




function PagosComponent() {
  const searchParams = useSearchParams();
  const transaction = searchParams.get("ref_payco"); // Capturar el valor de "transaction"

  const [load, setLoad] = useState(true);
  const [transaccion, setTransaccion] = useState<EpaycoTransaction | undefined>(undefined);

  useEffect(() => {
    peticionEpayco().then((respuesta) => {
      if (respuesta.success) {
        setTransaccion(respuesta.data);
        console.log(respuesta.data);
      }
    })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoad(false);
      })
  }, [])


  async function peticionEpayco() {
    try {
      const url = "https://secure.epayco.co/validation/v1/reference/" + transaction;
      const peticion = await fetch(url, {
        method: "GET"
      })
      if (!peticion.ok) {
        throw new Error("Error al consultar la transacción");
      }
      const respuesta = await peticion.json();
      return respuesta;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className={styles.main}>
      <section className={styles.seccion}>
        {
          load ?
            <h1>Cargando datos de la transacción...</h1>
            :
            transaccion ?
              <div className={styles.result}>
                <div className={styles.status}>
                  {
                    transaccion.x_cod_response == 1 ?
                      <>
                        <IconCircleDashedCheck size={70} color='#15c515' />
                        <h2 style={{ color: '#15c515' }}>Transacción exitosa</h2>
                      </>
                      :
                      transaccion.x_cod_response == 2 ?
                        <>
                          <IconCircleDashedX size={70} color='#FF0000' />
                          <h2 style={{ color: '#FF0000' }}>Transacción fallida</h2>

                        </>
                        :
                        transaccion.x_cod_response == 3 ?
                          <>
                            <IconCircleDashedMinus size={70} color='#F4A905' />
                            <h2 style={{ color: '#F4A905' }}>Transacción pendiente</h2>
                          </>
                          :
                          <h2>Transacción desconocida</h2>
                  }
                  <h2>
                    Referencia #{transaccion.x_ref_payco}
                  </h2>
                  <p>{transaccion.x_transaction_date}</p>
                </div>
                <div className={styles.titulo}>
                  <h3>Datos del pago</h3>
                  <div className={styles.container}>
                    <div>
                      <span>Método</span>
                      <p>{transaccion.x_franchise}</p>
                    </div>
                    <div>
                      <span>Autorización</span>
                      <p>{transaccion.x_approval_code}</p>
                    </div>
                  </div>
                  <div className={styles.container}>
                    <div>
                      <span>Recibo</span>
                      <p>{transaccion.x_transaction_id}</p>
                    </div>
                    <div>
                      <span>Dirección IP</span>
                      <p>{transaccion.x_customer_ip}</p>
                    </div>
                  </div>
                  <div className={styles.container}>
                    <div>
                      <span>Banco</span>
                      <p>{transaccion.x_bank_name}</p>
                    </div>
                    <div>
                      <span>Respuesta</span>
                      <p>{transaccion.x_response}</p>
                    </div>
                  </div>

                  <h3 style={{ marginTop: '20px' }}>Datos de la compra</h3>
                  <div className={styles.container}>
                    <div>
                      <span>Nombre del comercio</span>
                      <p>{transaccion.x_business}</p>
                    </div>
                    <div>
                      <span>Descripción</span>
                      <p>{transaccion.x_description}</p>
                    </div>
                  </div>
                  <div className={styles.container}>
                    <div>
                      <span>Valor de la compra</span>
                      <p>{Number(transaccion.x_amount).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}</p>
                    </div>
                    <div>
                      <span>Moneda</span>
                      <p>{transaccion.x_currency_code}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.buttons}>
                  <button onClick={()=>{window.print()}}>Imprimir <span><IconPrinter size={20} /></span></button>
                  <Link className={styles.regresar} href={'/'}>Regresar</Link>
                </div>
              </div>
              :
              <div className={styles.result}>
                <p>No se pudo obtener la información de la transacción, recarga la página</p>
              </div>

        }

      </section>
    </main>
  )
}

export default function Pagos() {
  return (
    <Suspense>
      <PagosComponent />
    </Suspense>
  )
}
