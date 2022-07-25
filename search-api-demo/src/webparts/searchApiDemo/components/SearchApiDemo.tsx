import * as React from 'react';
import styles from './SearchApiDemo.module.scss';
import { ISearchApiDemoProps } from './ISearchApiDemoProps';
// import { escape } from '@microsoft/sp-lodash-subset';
// import { SearchResults, SearchQueryBuilder, SearchQuery} from "sp-pnp-js/sp"
import { Pagination } from '@uifabric/experiments';
import pnp from "sp-pnp-js"

import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { ISearchApiDemoState } from './ISearchAPIDemoState';

export default class SearchApiDemo extends React.Component<ISearchApiDemoProps, ISearchApiDemoState> {
  private _rowPerPage: number = 5
  public constructor(props: ISearchApiDemoProps, state: ISearchApiDemoState){
    super(props)
    this.state = {
      searchResults: null, 
      page: 0,
      totalResults: 0
    }
  }

  componentDidUpdate(prevProps: Readonly<ISearchApiDemoProps>, prevState: Readonly<ISearchApiDemoState>): void {
    if(prevState.page !== this.state.page) {
      this.state.searchResults.getPage(this.state.page + 1).then(res => this.setState({searchResults: res}))
    }
  }

  private  _search(value: string): void {
      pnp.sp.search({Querytext: value, RowLimit: this._rowPerPage}).then(results => {
        this.setState({totalResults: results.TotalRows})
        this.setState({searchResults: results})
        this.setState({page: 0})
      }).catch(err => console.error(err))
  }


  public render(): React.ReactElement<ISearchApiDemoProps> {
    return (
      <section className={styles.searchApiDemo}>
         <SearchBox placeholder="Search" onSearch={value => this._search(value)} />
         <div>
          {this.state.searchResults ? <div>
            {this.state.searchResults.PrimarySearchResults.map(result => <div key={result.WorkId} className={styles.result}>
            <p className={styles.title}>Title: {result.Title}</p>
            <a className={styles.link}href={result.OriginalPath}>URL:{result.OriginalPath}</a>
            <p className={styles.author}>Author: {result.Author}</p>
            <p className={styles.summary}>Summary: {result.HitHighlightedSummary}</p>
          </div>)}

          {this.state.totalResults > this._rowPerPage && <Pagination
            selectedPageIndex={this.state.page}
            pageCount={Math.floor(this.state.totalResults/this._rowPerPage)}
            onPageChange={curPage => this.setState({page: curPage})}
            // format
            firstPageIconProps={{ iconName: 'DoubleChevronLeft' }}
            previousPageIconProps={{ iconName: 'ChevronLeft' }}
            nextPageIconProps={{ iconName: 'ChevronRight' }}
            lastPageIconProps={{ iconName: 'DoubleChevronRight' }}
          />}
        </div> : null}
         </div>
      </section>
    );
  }
}
