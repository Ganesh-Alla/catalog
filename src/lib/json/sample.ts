// lib/json/sample.ts

// We're exporting a constant that contains our JSON data
export const sampleData = {
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
} as const;  

export const sampleData1 = {
        "keys": {
            "n": 10,
            "k": 7
          },
          "1": {
            "base": "7",
            "value": "420020006424065463"
          },
          "2": {
            "base": "7",
            "value": "10511630252064643035"
          },
          "3": {
            "base": "2",
            "value": "101010101001100101011100000001000111010010111101100100010"
          },
          "4": {
            "base": "8",
            "value": "31261003022226126015"
          },
          "5": {
            "base": "7",
            "value": "2564201006101516132035"
          },
          "6": {
            "base": "15",
            "value": "a3c97ed550c69484"
          },
          "7": {
            "base": "13",
            "value": "134b08c8739552a734"
          },
          "8": {
            "base": "10",
            "value": "23600283241050447333"
          },
          "9": {
            "base": "9",
            "value": "375870320616068547135"
          },
          "10": {
            "base": "6",
            "value": "30140555423010311322515333"
          }
} as const;  // Using 'as const' ensures type safety for our constant values

// You can add more sample data exports here
export const samples = [
    {
        name: 'Example1',
        data: sampleData
    },{
        name: 'Example2',
        data: sampleData1
    }
];