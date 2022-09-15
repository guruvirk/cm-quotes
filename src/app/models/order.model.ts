export class Order {
    code?: string
    name?: string
    email?: string
    phone?: number
    date?: Date
    timeslot?: string
    where?: {
        special: string,
        line1: string,
        line2: string,
        district: string,
        suburb: string,
        city: string,
        state: string,
        pinCode: string,
        country: string,
        floor: string,
        isParkingAway: boolean,
        isElevator: boolean,
        vehicleAccess: string,
        accessToHome: string
    }
    to?: {
        special: string,
        line1: string,
        line2: string,
        district: string,
        suburb: string,
        city: string,
        state: string,
        pinCode: string,
        country: string,
        floor: string,
        isParkingAway: boolean,
        isElevator: boolean,
        vehicleAccess: string,
        accessToHome: string
    }
    size?: string
    sizeDetails?: string
    isMoveOnly?: boolean
    isCleaning?: boolean
    special?: string[]
    deliveryInfo?: string
    additionalInfo?: string
    status?: string
    lastUpdate?: Date

    constructor(obj?: any) {
        if (!obj) {
            return;
        }
        this.code = obj.code
        this.name = obj.name
        this.date = obj.date
        this.status = obj.status
        this.lastUpdate = obj.lastUpdate
        this.email = obj.email
        this.phone = obj.phone
        this.timeslot = obj.timeslot
        this.size = obj.size
        this.sizeDetails = obj.sizeDetails
        this.isMoveOnly = obj.isMoveOnly || false
        this.isCleaning = obj.isCleaning || false
        this.deliveryInfo = obj.deliveryInfo
        this.additionalInfo = obj.additionalInfo
        this.special = []

        if (obj.special && obj.special.length) {
            for (const item of obj.special) {
                this.special.push(item)
            }
        }

        if (obj.where) {
            this.where = {
                special: obj.where.special,
                line1: obj.where.line1,
                line2: obj.where.line2,
                district: obj.where.district,
                suburb: obj.where.suburb,
                city: obj.where.city,
                state: obj.where.state,
                pinCode: obj.where.pinCode,
                country: obj.where.country,
                floor: obj.where.floor,
                isParkingAway: obj.where.isParkingAway,
                isElevator: obj.where.isElevator,
                vehicleAccess: obj.where.vehicleAccess,
                accessToHome: obj.where.accessToHome
            }
        }

        if (obj.to) {
            this.to = {
                special: obj.to.special,
                line1: obj.to.line1,
                line2: obj.to.line2,
                district: obj.to.district,
                suburb: obj.to.suburb,
                city: obj.to.city,
                state: obj.to.state,
                pinCode: obj.to.pinCode,
                country: obj.to.country,
                floor: obj.to.floor,
                isParkingAway: obj.to.isParkingAway,
                isElevator: obj.to.isElevator,
                vehicleAccess: obj.to.vehicleAccess,
                accessToHome: obj.to.accessToHome
            }
        }

    }
}