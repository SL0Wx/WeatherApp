import { Accordion, AccordionItem, AccordionItemHeading } from "react-accessible-accordion"

const Forecast = ({ data }) => {
    return (
        <>
            <label className="title">Daily</label>
            <Accordion allowZeroExpanded>
                {data.list.slice(0, 7).map((item, i) => (
                    <AccordionItemHeading></AccordionItemHeading>
                ))}
                <AccordionItem></AccordionItem>
            </Accordion>
        </>
    )
}

export default Forecast