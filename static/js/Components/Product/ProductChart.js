import { Chart } from 'primereact/chart';
import { formatPrice } from './Products';
import { ChartTitle } from './styles';

const ProductChart = ({ product }) => {

    const basicData = {
        labels: product.historial.map(prod => prod.date),
        datasets: [
            {
                label: 'Historial De Precios',
                data: product.historial.map(prod => formatPrice(prod.price)),
                fill: false,
                borderColor: '#42A5F5',
                tension: .4
            }
        ]
    };

    const basicOptions = {
        maintainAspectRatio: false,
        aspectRatio: .6,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };

    return (
        <>
            <ChartTitle>
                tienda: {product.store}
            </ChartTitle>
            <Chart type="line" data={basicData} options={basicOptions} />
        </>
    )
}

export default ProductChart