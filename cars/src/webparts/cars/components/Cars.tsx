import * as React from 'react';
import styles from './Cars.module.scss';
import { ICarsProps, ICar } from './ICarsProps';

import pnp from "sp-pnp-js";
// import { DocumentCard, DocumentCardImage, DocumentCardDetails, DocumentCardTitle, ImageFit, IDocumentCardStyles } from 'office-ui-fabric-react';

export default class Cars extends React.Component<ICarsProps, {cars: ICar[]}> {
  public constructor (props: ICarsProps){
    super(props);
    this.state = {
      cars: []
    }
    this._getCarItems()
  }

  private _getCarItems(): void {
    pnp.sp.web.lists.getByTitle("Cars").items
    .select("ID", "Title", "Colors", "Tags", "Price", "Description", "Picture", "Brand/Title").expand("Brand").getAll()
    .then((data) => {
      this.setState({cars: data})
    })
    .catch((err) => console.log(err))
  }  

 
  public render(): React.ReactElement {
    const {brand} = this.props;

    let filteredCars: ICar[];
    if (!brand) filteredCars = this.state.cars
    else {
      filteredCars = this.state.cars.filter(car => car.Brand.Title.toLowerCase().indexOf(brand.toLowerCase()) !== -1)
    }

    // const cardStyles: IDocumentCardStyles = {
    //   root: { display: 'inline-block', marginTop: 20, marginRight: 20, width: 400 },
    // };

    return (
      <section className={styles.cars}>
          <div className={styles.filter}>{`Filter by brand: ${brand ? brand : 'All brand'}`}</div>
          <div className={styles.carContainer}>
          {filteredCars.length ? filteredCars
          .map(car => <div className={styles.carItem} key={car.ID}>
            <img className={styles.carImg} src={car.Picture?.Url} alt={car.Picture.Description}/>
              <p className={styles.carTitle}>{car.Title}</p>
              <p className={styles.carBrand}>Brand: {car.Brand.Title}</p>
              <p className={styles.carPrice}>Price: ${car.Price}</p>
              <ul className={styles.tagList}>
                {car.Tags.map(tag => 
                  <li key={tag.WssIs} className={styles.tagItem}>{tag.Label}</li>)}
              </ul>
          </div>
            ) : 
            <p>No car found.</p>}
          {/* {filteredCars.length ? filteredCars
          .map(car => 
            <DocumentCard
              key={car.ID}
              styles={cardStyles}
              onClickHref={car.Picture.Url}
            > 
              <DocumentCardImage height={150} imageFit={ImageFit.cover} imageSrc={car.Picture.Url} />
              <DocumentCardDetails>
              <DocumentCardTitle title={car.Title} shouldTruncate />
              <DocumentCardTitle title={`Brand: ${car.Brand.Title}`} shouldTruncate showAsSecondaryTitle/>
              <DocumentCardTitle title={`Price: ${car.Price}`} shouldTruncate showAsSecondaryTitle/>
              </DocumentCardDetails>
            </DocumentCard>
            ) : 
            <p>No car found.</p>} */}
          </div>
      </section>
    );
  }

  
}
