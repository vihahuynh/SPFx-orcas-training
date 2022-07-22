import * as React from 'react';
import styles from './Files.module.scss';
import { IFilesProps } from './IFilesProps';

import pnp from "sp-pnp-js"


export default class Files extends React.Component<IFilesProps, {}> {
  public constructor(props: IFilesProps) {
    super(props)
    this._addFileUsingPath()
  }

  private _readingFile(): void{
    // blob
    pnp.sp.web.getFileByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/test.docx").getBlob()
    .then(res => console.log("blob: ", res))
    .catch(err => console.log(err))

    // buffer
    pnp.sp.web.getFileByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/test.docx").getBuffer()
    .then(res => console.log("buffer: ", res))
    .catch(err => console.log(err))

    // JSON
    pnp.sp.web.getFileByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/FilesWebPart.manifest.json").getJSON()
    .then(res => console.log("json: ", res))
    .catch(err => console.log(err))

    // text
    pnp.sp.web.getFileByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/FilesWebPart.manifest.json").getText()
    .then(res => console.log("text: ", res))
    .catch(err => console.log(err))
  }

  private _updateFileContent(): void {
    pnp.sp.web.getFileByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/test.txt").setContent("Updated file !!!")
    .then(res => console.log("text: ", res))
    .catch(err => console.log(err))
  }

  private _checkInFile(): void {
    pnp.sp.web.getFileByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/test.docx").checkout()
    .then(() => console.log("file checked out!"))
    .catch(err => console.log(err))


    pnp.sp.web.getFileByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/test.docx").checkin("a comment")
    .then(() => console.log("file checked in!"))
    .catch(err => console.log(err))
  }

  private _approveDenyFile(): void {
    // pnp.sp.web.getFileByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/test.txt").deny("Deny file")
    // .then(() => console.log("File denied!"))
    // .catch(err => console.log(err))

    pnp.sp.web.getFileByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/test.docx").approve("Approve file")
    .then(() => console.log("File approved!"))
    .catch(err => console.log(err))
  }

  private _publishUnpublishFile(): void {
    // pnp.sp.web.getFileByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/test.txt").publish("Publish file")
    // .then(() => console.log("File published!"))
    // .catch(err => console.log(err))

    pnp.sp.web.getFileByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/test.docx").unpublish("Unpublish file")
    .then(() => console.log("File unpublished!"))
    .catch(err => console.log(err))
  }

  private _getFileItems(): void{
    pnp.sp.web.getFileByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/test.docx").getItem("Id", "Title")
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  private _moveFile(): void{
    pnp.sp.web.getFileByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/test.docx").moveTo("/sites/TestTeamSite-Ha/Shared Documents/my-folder/test-1.docx")
    .then(() => console.log("File moved!"))
    .catch(err => console.log(err))
  }

  private _copyFile(): void{
    pnp.sp.web.getFileByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/my-folder/test-1.docx").copyTo("/sites/TestTeamSite-Ha/Shared Documents/test-2.docx", )
    .then(() => console.log("File copied!"))
    .catch(err => console.log(err))
  }

  private _deleteFile(): void{
    pnp.sp.web.getFileByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/test-2.docx").delete()
    .then(() => console.log("File deleted!"))
    .catch(err => console.log(err))
  }

  
  // private _isFileExists(): void{
  //   pnp.sp.web.getFileByServerRelativeUrl("/sites/TestTeamSite-Ha/Shared Documents/test-2.txt").select("Exists").get()
  //   .then((res) => console.log("File exists: ", res))
  //   .catch(() => console.log("File not exists"))
  // }

  private _getShareLink(): void {
    pnp.sp.web.getFileByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/test.txt").getShareLink()
    .then(res => console.log("Share link: ", res))
    .catch(err => console.log(err))
  }

  private _getShareInfo(): void {
    pnp.sp.web.getFileByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/test.txt").getSharingInformation()
    .then(res => console.log("Share info: ", res))
    .catch(err => console.log(err))
  }

  private _toFileUrl(): void {
    const url: string = pnp.sp.web.getFileByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/test.txt").toUrl()
    console.log("url: ", url)
  }

  private _addFileUsingPath(): void {
    pnp.sp.web.getFolderByServerRelativePath("/sites/TestTeamSite-Ha/Shared Documents/my-folder").files.add("/sites/TestTeamSite-Ha/Shared Documents/my-folder/test-1.docx", "32424dfh")
    .then(res => console.log("add: ", res))
    .catch(err => console.log(err))
  }

  public render(): React.ReactElement<IFilesProps> {
    return (
      <section className={styles.files}>
        <h1>READING FILES</h1>
      </section>
    );
  }
}
