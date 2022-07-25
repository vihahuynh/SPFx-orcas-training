import * as React from 'react';
import styles from './Cars.module.scss';
import { ICarsProps, ICar, ITag } from './ICarsProps';
import { ICarsState } from './ICarsState';

import { TaxonomyPicker, IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";

import pnp from "sp-pnp-js";

// import { DocumentCard, DocumentCardImage, DocumentCardDetails, DocumentCardTitle, ImageFit, IDocumentCardStyles } from 'office-ui-fabric-react';

export default class Cars extends React.Component<ICarsProps, ICarsState> {
  public constructor (props: ICarsProps){
    super(props);
    this.state = {
      selectedTerms: [],
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

  private _onTaxPickerChange(terms : IPickerTerms) {
    this.setState({selectedTerms: terms})
  }
  
  private _checkIntersection = (car: ICar, terms: IPickerTerms): boolean => car.Tags.filter(tag => terms.some(term => term.name === tag.Label)).length > 0

  public render(): React.ReactElement {
    const {brand} = this.props;

    let filteredCars: ICar[];
    const filterBrands = (car: ICar): boolean => brand ? car.Brand.Title.toLowerCase().indexOf(brand.toLowerCase()) !== -1 : true
    const filterTags = (car: ICar, terms: IPickerTerms): boolean => this.state.selectedTerms.length !== 0 ? this._checkIntersection(car, terms) : true

    filteredCars = this.state.cars.filter(car => filterBrands(car) && filterTags(car, this.state.selectedTerms))

    return (
      <section className={styles.cars}>
          <div className={styles.filter}>{`Filter by brand: ${brand ? brand : 'All brand'}`}</div>

          <TaxonomyPicker allowMultipleSelections={true}
                termsetNameOrID="Features"
                panelTitle="Select Term"
                label="Filter by tags"
                context={this.props.context}
                onChange={this._onTaxPickerChange.bind(this)}
                isTermSetSelectable={false} />

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
