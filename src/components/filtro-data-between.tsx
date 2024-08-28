import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-dropdown-menu";
import { UpdateIcon } from "@radix-ui/react-icons";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { DateTime } from "luxon";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card, CardContent } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

function getBeginDayOrFirstMomentInCurrentMonth(date: DateTime | null) {
    const now = date ?? DateTime.now();
    return now.set({ day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 });
}

function getEndDayOrEndMomentInCurrentMonth(date: DateTime | null) {
    const now = date ?? DateTime.now();
    const lastDayOfMonth = now.endOf('month');
    return lastDayOfMonth.set({ hour: 23, minute: 59, second: 59 });
}

export default function FiltroDataBetween() {

    const { dataInicial, setDataInicial,
        dataFinal, setDataFinal,
        setRefreshFilter } = React.useContext(FiltroDataBetweenContext);

    return (
        <Card><CardContent className="items-middle">
            <div className="grid gap-1 grid-cols-4 items-center mt-6">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Data Inicial</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !dataInicial && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dataInicial ? (
                                    dataInicial.toFormat('dd/MM/yyyy')
                                ) : (
                                    <span>Selectione a Data</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                locale={ptBR}
                                selected={dataInicial?.toJSDate()}
                                onSelect={(date) => !date ? setDataInicial!(getBeginDayOrFirstMomentInCurrentMonth(null)) : setDataInicial!(DateTime.fromJSDate(date))}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Data Final</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !dataFinal && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dataFinal ? (
                                    dataFinal.toFormat('dd/MM/yyyy')
                                ) : (
                                    <span>Selectione a Data</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                locale={ptBR}
                                selected={dataFinal?.toJSDate()}
                                onSelect={(date) => !date ? setDataFinal!(getEndDayOrEndMomentInCurrentMonth(null)) : setDataFinal!(DateTime.fromJSDate(date))}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <Button className="max-w-[30ch]" onClick={() => setRefreshFilter!(new Date())}>
                    <UpdateIcon className="mr-2 h-4 w-4" />Atualizar
                </Button>
            </div>
        </CardContent></Card>
    );
}


type FiltroDataBetweenType = {
    dataInicial: DateTime;
    setDataInicial: Dispatch<SetStateAction<DateTime>> | null;
    dataFinal: DateTime;
    setDataFinal: Dispatch<SetStateAction<DateTime>> | null;
    refreshFilter: Date;
    setRefreshFilter: React.Dispatch<React.SetStateAction<Date>> | null;
};

export const FiltroDataBetweenContext = React.createContext({
    dataInicial: getBeginDayOrFirstMomentInCurrentMonth(null),
    setDataInicial: null,
    dataFinal: getEndDayOrEndMomentInCurrentMonth(null),
    setDataFinal: null,
    refreshFilter: new Date(),
    setRefreshFilter: null
} as FiltroDataBetweenType);

export const FiltroDataBetweenContextProvider = ({
    children,
}: {
    children: any;
}) => {
    const [dataInicial, setDataInicial] = React.useState<DateTime>(getBeginDayOrFirstMomentInCurrentMonth(null));
    const [dataFinal, setDataFinal] = React.useState<DateTime>(getEndDayOrEndMomentInCurrentMonth(null));
    const [refreshFilter, setRefreshFilter] = React.useState<Date>(new Date());

    return (
        <FiltroDataBetweenContext.Provider
            value={{
                dataInicial,
                setDataInicial,
                dataFinal,
                setDataFinal,
                refreshFilter,
                setRefreshFilter
            }}
        >
            {children}
        </FiltroDataBetweenContext.Provider>
    );
};