
export const metadata = {
  title: "routeDemo - Create Next App",
  description: "routeDemo - Generated by create next app",
};

export default function ParallelRouteLayout(props) {
  return (
    <div>
      <div>parallelRoute-layout-header</div>
      <div>注意：新增并行路由的时候要重启dev并刷新</div>
      <div>并行路由paralle1：</div>
      <div>{props.paralle1}</div>
      <div>并行路由paralle2：</div>
      <div>{props.paralle2}</div>
      {props.children}
      <div>parallelRoute-layout-footer</div>
    </div>
  );
}
