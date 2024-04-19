// import {faker} from '../faker';
import { faker } from '@faker-js/faker';
import {PropertyModel} from "../models/Properties.js"

const generateData=async ()=>{
    const properties=[];
    console.log("hello")
    for(let i=1;i<3;i++){
        const numImageUrls = faker.number.int({ min: 3, max: 10 }); // Generate random number of image URLs
        const imageUrls = [];
        for (let j = 0; j < numImageUrls; j++) {
            imageUrls.push(faker.image.url());
        }
        const type=faker.helpers.arrayElement(["sell","rent"]);
        const property = {
            name: faker.helpers.arrayElement(["Modern house","Vintage House","Seaside villa"]),
            description: faker.lorem.paragraph(),
            address: faker.lorem.sentence({max:30}),
            buy_price: type === 'sell' ? faker.number.int({min:1000,max:100000}) : null,
            rent_price: type === 'rent' ? faker.number.int({min:100,max:5000}): null,
            area: faker.number.int({min:10,max:10000}),
            bathrooms: faker.number.int({min:1, max:10}),
            bedrooms: faker.number.int({min:1, max:10}),
            furnished: faker.datatype.boolean(),
            parking: faker.datatype.boolean(),
            garden: faker.datatype.boolean(),
            theatre: faker.datatype.boolean(),
            tennis: faker.datatype.boolean(),
            type: type,
            imageUrls:imageUrls,
            userRef: "65f9c900d4ab247809d80fd8"
        };
        // const type = faker.random.arrayElement(['sell', 'rent']);
        // const property = {
        //     name: faker.address.streetName(),
        //     description: faker.lorem.paragraph(),
        //     address: faker.address.streetAddress(),
        //     buy_price: type === 'sell' ? faker.random.number() : null,
        //     rent_price: type === 'rent' ? faker.random.number() : null,
        //     area: faker.random.number(),
        //     bathrooms: faker.random.number(),
        //     bedrooms: faker.random.number(),
        //     furnished: faker.random.boolean(),
        //     parking: faker.random.boolean(),
        //     garden: faker.random.boolean(),
        //     theatre: faker.random.boolean(),
        //     tennis: faker.random.boolean(),
        //     type: type,
        //     imageUrls: [faker.image.imageUrl()],
        //     userRef: "65f9c900d4ab247809d80fd8"
        // };
        properties.push(property);
    }
    return properties;
}
const insertFakeData = async () => {
    try {
        const fakeData =await generateData();
        const first=fakeData[0];
        const res=await PropertyModel.create(first);
        console.log(res);
        // for(let i=0;i<fakeData.length;i++){

        // }
        console.log('Fake data inserted successfully.');
    } catch (err) {
        console.error('Error inserting fake data:', err);
    }
};

insertFakeData();