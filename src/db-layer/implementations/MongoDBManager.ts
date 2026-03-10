import mongoose from "mongoose";
import { ReadPreference } from "mongodb";

export class MongoDBManager {

  private dbUrl: string;

  constructor(dbUrl: string) {
    this.dbUrl = dbUrl;
  }

  private getOptions(): any {
    const options = {
      bufferCommands: false,
      autoIndex: false,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 60000,
      family: 4,
      noDelay: true,
      appname: "iou-backend",
      readPreference: ReadPreference.SECONDARY_PREFERRED,
      w: 1,
    };

    return options;
  }

  // public connect(): void {
  //   (<any>mongoose).Promise = Promise;
  //   mongoose.connect(this.dbUrl, this.getOptions()).then((res) => {
  //     console.log('Database connection successful', JSON.stringify(res && res.connections && res.connections[0] && res.connections[0].db.namespace))
  //   })
  //     .catch(err => {
  //       console.error('Database connection error', err)
  //     })
  // }
  public async connect(): Promise<void> {
    try {
      mongoose.Promise = Promise; // Use native Promises
      const res = await mongoose.connect(this.dbUrl, this.getOptions());

      const connection = res.connections[0];
      if (connection) {
        console.log("Database connection successful:", connection.name);
      } else {
        console.error("No connection found in response");
      }
    } catch (err) {
      console.error("Database connection error:", err);
      process.exit(1); // Exit if DB fails to connect
    }
  }
}
//   public connect(): void {
//     (<any>mongoose).Promise = Promise;
//     mongoose.connect(this.dbUrl, this.getOptions())
//       .then((res) => {
//         const connection = res.connections && res.connections[0];
//         if (connection) {
//           console.log('Database connection successful', connection.name);
//         } else {
//           console.error('No connection found in response');
//         }
//       })
//       .catch(err => {
//         console.error('Database connection error', err);
//       });
//   }
// }