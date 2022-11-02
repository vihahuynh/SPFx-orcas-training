export default interface ICarRenting {
    Title: string,
    ID: number,
    Car: { Title: string },
    StartTime: Date,
    EndTime: Date
}