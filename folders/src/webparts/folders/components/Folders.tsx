import * as React from 'react';
import styles from './Folders.module.scss';
import { IFoldersProps } from './IFoldersProps';

import pnp from "sp-pnp-js"

export default class Folders extends React.Component<IFoldersProps, {}> {
  public constructor(props: IFoldersProps){
    super(props)
    this._getFolderItems()
  }

  private _getFolders():void {
    // console.log(pnp.sp.web.folders.getByName("/sites/TestTeamSite-Ha/Shared Documents/"))
    // console.log(pnp.sp.web.folders.select())

    pnp.sp.web.getFolderByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/my-folder").getItem()
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  private _addFolder(): void {
    pnp.sp.web.getFolderByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/my-folder").folders.add("new-folder")
    .then(() => console.log("Add folder succesfully!"))
    .catch(err => console.log(err))
  }

  private _getFolderItems(): void {
    pnp.sp.web.getFolderByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/my-folder").getItem()
    .then(res => console.log("Items: ", res))
    .catch(err => console.log(err))
  }

  private _deleteFolder(): void {
    pnp.sp.web.getFolderByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/my-folder/new-folder").delete()
    .then(() => console.log("folder deleted!"))
    .catch(err => console.log(err))
  }

  private _recycleFolder(): void {
    pnp.sp.web.getFolderByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/my-folder/new-folder").recycle()
    .then(() => console.log("folder recycled!"))
    .catch(err => console.log(err))
  }

  private _getServerRelativeUrl(): void {
    console.log(pnp.sp.web.getFolderByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/my-folder/new-folder").serverRelativeUrl)
  }

  private _updateFolder(): void {
    pnp.sp.web.getFolderByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/my-folder").update({Name: "update-folder-name"})
    .then(() => console.log("Updated!"))
    .catch(err => console.log(err))
  }

  private _getContentTypeOrder(): void {
    console.log(pnp.sp.web.getFolderByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/my-folder").select('contentTypeOrder'))
  }

  private _getAllFolders(): void {
    pnp.sp.web.getFolderByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents").folders.get()
    .then(res => console.log("all folders: ", res))
    .catch(err => console.log(err))
  }

  private _getAllFiles(): void {
    pnp.sp.web.getFolderByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents").files.get()
    .then(res => console.log("all files: ", res))
    .catch(err => console.log(err))
  }

  private _listAllItemFields(): void {
    console.log(pnp.sp.web.getFolderByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents").listItemAllFields)
  }

  private _getParentFolder(): void {
    console.log(pnp.sp.web.getFolderByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/my-folder").parentFolder)
  }

  private _getFolderProperties(): void {
    console.log(pnp.sp.web.getFolderByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/my-folder").properties)
  }

  // private _renameFolder(): void {
  //   pnp.sp.web.getFolderByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/my-fo
  //   .then(() => console.log("renamed"))
  //   .catch(err => console.log(err))
  // }



  public render(): React.ReactElement<IFoldersProps> {
    return (
      <section className={styles.folders}>
        <h1>FOLDERS</h1>
      </section>
    );
  }
}
