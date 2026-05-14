import { Link } from "react-router-dom";

function CheckoutPage() {

    return (
        <div className="container">
          <div className="section" style={{ paddingBottom: "0" }}>
            <div className="section-title">Finalizeaza comanda</div>
            <div className="section-subtitle">
              Completeaza datele de livrare si plata
            </div>
          </div>

          {/* <!-- Step indicator --> */}
          <div className="stepper">
            <div className="stepper-step is-done">
              <div className="stepper-circle">✓</div>
              <div className="stepper-label">Cos</div>
            </div>
            <div className="stepper-connector"></div>
            <div className="stepper-step is-active">
              <div className="stepper-circle">2</div>
              <div className="stepper-label">Livrare &amp; plata</div>
            </div>
            <div className="stepper-connector"></div>
            <div className="stepper-step">
              <div className="stepper-circle">3</div>
              <div className="stepper-label">Confirmare</div>
            </div>
          </div>

          <form id="checkout-form">
            <div className="checkout-layout">
              <div>
                <div className="checkout-section">
                  <h3>Date de contact</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="co-name">
                        Nume Complet <span className="required">*</span>
                      </label>
                      <input
                        id="co-name"
                        className="form-input"
                        type="text"
                        defaultValue="Andrei Popescu"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="co-email">
                        Email <span className="required">*</span>
                      </label>
                      <input
                        id="co-email"
                        className="form-input"
                        type="email"
                        defaultValue="andrei.popescu@email.ro"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="co-phone">
                      Telefon <span className="required">*</span>
                    </label>
                    <input
                      id="co-phone"
                      className="form-input"
                      type="tel"
                      defaultValue="0722 111 222"
                      required
                    />
                  </div>
                </div>

                <div className="checkout-section">
                  <h3>Adresa de livrare</h3>
                  <div className="form-group">
                    <label className="form-label" htmlFor="co-addr">
                      Adresa completa <span className="required">*</span>
                    </label>
                    <input
                      id="co-addr"
                      className="form-input"
                      type="text"
                      defaultValue="Str. Victoriei 45, Bucuresti"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="co-city">
                        Oras <span className="required">*</span>
                      </label>
                      <input
                        id="co-city"
                        className="form-input"
                        type="text"
                        defaultValue="Bucuresti"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="co-country">
                        Tara <span className="required">*</span>
                      </label>
                      <select id="co-country" className="form-select" defaultValue="Romania" required>
                        <option>Romania</option>
                        <option>Germania</option>
                        <option>Franta</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-checkbox">
                      <input type="checkbox" defaultChecked /> Adresa de facturare este
                      aceeasi cu adresa de livrare
                    </label>
                  </div>
                </div>

                <div className="checkout-section">
                  <h3>Metoda de plata</h3>
                  <div className="form-group">
                    <label
                      className="form-checkbox"
                      style={{ marginBottom: "10px" }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        id="pay-card"
                        defaultChecked
                      />{" "}
                      Card bancar
                    </label>
                    <label
                      className="form-checkbox"
                      style={{ marginBottom: "10px" }}
                    >
                      <input type="radio" name="payment" id="pay-cod" /> Ramburs
                      la livrare
                    </label>
                    <label className="form-checkbox">
                      <input type="radio" name="payment" id="pay-bank" />{" "}
                      Transfer bancar
                    </label>
                  </div>

                  <div id="card-fields">
                    <div className="form-group">
                      <label className="form-label" htmlFor="cc-num">
                        Numar Card <span className="required">*</span>
                      </label>
                      <input
                        id="cc-num"
                        className="form-input"
                        type="text"
                        inputMode="numeric"
                        maxLength={19}
                        placeholder="1234 5678 9012 3456"
                        autoComplete="cc-number"
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="cc-exp">
                          Data Expirare <span className="required">*</span>
                        </label>
                        <input
                          id="cc-exp"
                          className="form-input"
                          type="text"
                          inputMode="numeric"
                          maxLength={5}
                          placeholder="MM/AA"
                          autoComplete="cc-exp"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="cc-cvv">
                          CVV <span className="required">*</span>
                        </label>
                        <input
                          id="cc-cvv"
                          className="form-input"
                          type="text"
                          inputMode="numeric"
                          maxLength={4}
                          placeholder="123"
                          autoComplete="cc-csc"
                        />
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--text-light)",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      🔒 Plata securizata SSL — datele cardului nu sunt stocate.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="cart-summary">
                  <h3>Sumar comanda</h3>
                  <div className="order-lines">
                    <div className="order-line">
                      <span>Laptop ProMax 15 x1</span>
                      <span>4,599 RON</span>
                    </div>
                    <div className="order-line">
                      <span>Tricou Sport Dry-Fit x2</span>
                      <span>178 RON</span>
                    </div>
                    <div className="order-line">
                      <span>Minge Fotbal Pro x1</span>
                      <span>120 RON</span>
                    </div>
                  </div>
                  <div className="summary-row">
                    <span className="label">Subtotal</span>
                    <span>4,897 RON</span>
                  </div>
                  <div className="summary-row">
                    <span className="label">Livrare</span>
                    <span
                      style={{ color: "var(--success)", fontWeight: "500" }}
                    >
                      Gratuita
                    </span>
                  </div>
                  <div className="summary-row">
                    <span className="label">TVA (19%)</span>
                    <span>930 RON</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>5,827 RON</span>
                  </div>
                  <Link
                    to={`/confirmation/${1007}`}
                    id="place-order"
                    className="btn btn-primary btn-block btn-lg"
                    style={{ marginTop: "20px" }}
                  >
                    Plaseaza comanda
                  </Link>
                  <Link
                    to={"/cart"}
                    className="btn btn-ghost btn-block"
                    style={{ marginTop: "20px" }}
                  >
                    Inapoi la cos
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
    );

}

export default CheckoutPage;