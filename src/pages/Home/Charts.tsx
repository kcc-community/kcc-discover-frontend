import * as React from "react";
import echarts from "echarts";

/**
 * params
 * key: string; 
 * option: object | null; 
 * style: {
 *      width: string;
 *      height: string;
 * };
 * className?: string;
 * onRender?(instance): void;
 */

interface ChartProps {
    key: string;
    option: object | null;
    style: {
        width?: string;
        height?: string;
        maxWidth?: string;
        maxHeight?: string;
        minWidth?: string;
        minHeight?: string;
    };
    className?: string;

    onRender?(instance): void;
}

const Chart = (props: ChartProps): React.ReactElement => {

    let chartDom: any = null;

    type Callback = () => void;
    React.useEffect((): Callback => {
        function showLoading(instance): void {
            instance.showLoading("default", {
                text: "",
                color: "#18BB97",
                textColor: "#000000",
                maskColor: "transparent",
                zlevel: 0
            });
        }

        let instance = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);

        const resize = (): void => instance.resize();
        window.removeEventListener("resize", resize);
        window.addEventListener("resize", resize);

        showLoading(instance);

        if (props.option) {
            if (instance) instance.hideLoading();
            instance.setOption(props.option as any);
        }

        if (props.onRender) props.onRender(instance);

        return (): void => {
            echarts.dispose(instance);
            window.removeEventListener("resize", resize);
        };

    }, [chartDom, props]);

    const refOnRender = (el): void => chartDom = el;
    
    return React.createElement("div", {
        ref: refOnRender,
        style: props.style,
        className: props.className
    });

};

export default Chart;