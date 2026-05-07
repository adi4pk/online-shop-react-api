export function MockupBar(){
    return(
        <>
         <div className="mockup-bar">
          <div>
            <a href="index.html">&larr; Toate paginile</a>
          </div>
          <div className="mockup-route">/products</div>
          <div>
            Click pe produs &rarr;{" "}
            <a href="product-detail.html">ProductDetailPage</a>
          </div>
        </div>
        </>
    )
}

export default MockupBar;
