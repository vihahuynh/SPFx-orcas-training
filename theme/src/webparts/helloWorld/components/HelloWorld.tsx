import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
  public render(): React.ReactElement<IHelloWorldProps> {
  
    return (
      <section className={styles.helloWorld}>
        <a href="https://orcasvn.sharepoint.com/Tasks/SitePages/Home.aspx#/projects/26/tasks/18" className={styles.button}>Show more</a>
      </section>
    );
  }
}
