// Unidades ya configuradas como las de la BBDD, pásalos tal cual

/**
 * Calcula el consumo simulado de combustible de un coche en un circuito, en base a la longitud del circuito, el consumo del coche y el número de vueltas a realizar.
 * 
 * @param longitudCircuito Longitud del circuito en metros
 * @param consumoCoche Consumo del coche en litros en cada 100 km
 * @param nVueltas Número de vueltas a realizar (por defecto 1)
 * @returns El consumo de combustible en litros
 */
export function comsumoCombustible(longitudCircuito: number, consumoCoche: number, nVueltas: number = 1) {
    return longitudCircuito * nVueltas * consumoCoche / 100_000;
}

enum TCurva {
    LENTA = 0,
    MEDIA = 1,
    RAPIDA = 2,
}

interface ICoche {
    erscurvaLenta: number;
    erscurvaMedia: number;
    erscurvaRapida: number;
};

interface ICircuito {
    curvasLentas: number;
    curvasMedias: number;
    curvasRapidas: number;
}

export enum Conduccion {
    AHORRADOR = 1.05,
    NORMAL = 0.75,
    DEPOTENCIADO = 0.4,
}

export class EnergyRecoverySystem {
    /** El límite de energía que se puede recuperar por vuelta por reglamentación */
    public static readonly GAIN_LIMIT_PER_LAP = 0.6
    /** The car that has this ERS */
    private readonly _coche: ICoche
    /** Max capacity of the ERS in kWh */
    private readonly _maxCapacity: number
    /** Current capacity of the ERS in kWh */
    private _currentCapacity: number // TODO: Por confirmar si es necesario

    public constructor(coche: ICoche) {
        this._coche = coche
        this._maxCapacity = 1.2
        this._currentCapacity = 0
    }

    /**
     * Obtener la cantidad de energía que se recupera por paso por la curva
     * 
     * @param curva Tipo de curva según la velocidad de paso
     * @returns La cantidad de energía que se recupera por paso por la curva
     */
    public gainValForCurva(curva: TCurva) {
        switch (curva) {
            case TCurva.LENTA:
                return this._coche.erscurvaLenta
            case TCurva.MEDIA:
                return this._coche.erscurvaMedia
            case TCurva.RAPIDA:
                return this._coche.erscurvaRapida
        }
    }

    /**
     * Obtener la cantidad de energía que se recupera por paso de una vuelta por el circuito
     * 
     * @param circuito Datos del circuito, incluyendo el número de curvas de cada tipo
     * @param conduccion Tipo de conducción del piloto
     * @returns La cantidad de energía que se recupera por paso de una vuelta por el circuito
     */
    public gainValForCircuito(circuito: ICircuito, conduccion: Conduccion): number {
        const gainCurv = circuito.curvasLentas * this.gainValForCurva(TCurva.LENTA) +
            circuito.curvasMedias * this.gainValForCurva(TCurva.MEDIA) +
            circuito.curvasRapidas * this.gainValForCurva(TCurva.RAPIDA)
        return Math.min(gainCurv * conduccion, EnergyRecoverySystem.GAIN_LIMIT_PER_LAP)
    }

    /**
     * Obtener el número de vueltas necesarias para recargar completamente el ERS
     * 
     * @param circuito Datos del circuito, incluyendo el número de curvas de cada tipo
     * @param conduccion Tipo de conducción del piloto
     * @returns El número de vueltas necesarias para recargar completamente el ERS
     */
    public numVueltasToRecharge(circuito: ICircuito, conduccion: Conduccion): number {
        return this._maxCapacity / this.gainValForCircuito(circuito, conduccion)
    }
}