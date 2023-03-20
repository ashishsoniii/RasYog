import pandas as pd
import numpy as np
from numerize import numerize
import warnings
# numerize.numerize(123445.8)
warnings.filterwarnings('ignore')

# sckit learn
from sklearn.impute import SimpleImputer

# matplot lib and seaborn imports
import matplotlib.pyplot as plt
# %matplotlib inline
import seaborn as sns
import json
import plotly
import plotly.express as px
from plotly.subplots import make_subplots

# df=pd.read_excel('')
df = pd.read_excel('./Files/Store_data_v2.xlsx')
df['year'] = df['Date'].dt.year
df['month'] = df['Date'].dt.month
data = df.drop(['Barcode', 'size', 'Size', 'Style', 'SM', 'Serial No'], axis=1)

# date
nan_date = data[data['Date'].isna()]

# qty
mode_val = data['Qty'].mode()[0]
data['Qty'].replace(np.nan, mode_val, inplace=True)

# Amount
nan_Amount = data[data['Amount'].isna()]


# Amount is given by the product of rate and qty , so missing values can be filled accordingly
def amount(x):
    if np.isnan(x['Amount']):
        return x['Qty'] * x['Rate']
    else:
        return x['Amount']


data['Amount'] = data.apply(lambda x: amount(x), axis=1)

# handiling discount column : if absent replace with 0
data['Dis Per'].replace(np.nan, 0, inplace=True)


def effRate(x):
    if np.isnan(x['EffRate']):
        return x['Rate']
    else:
        return x['EffRate']


data['EffRate'] = data.apply(lambda x: effRate(x), axis=1)


# EffAmount is given by the product of effrate and qty , so missing values can be filled accordingly
def amount(x):
    if np.isnan(x['EffAmt']):
        return x['Qty'] * x['EffRate']
    else:
        return x['Amount']


data['EffAmt'] = data.apply(lambda x: amount(x), axis=1)

cost_null = data[data['EffCost'].isna()]

data['EffCost'].replace(np.nan, 0, inplace=True)
data['Margin'].replace(np.nan, 0, inplace=True)
data['Margin % on Cost'].replace(np.nan, 0, inplace=True)
data['PerOn MRP'].replace(np.nan, 0, inplace=True)
data['TaxRate'].replace(np.nan, 0, inplace=True)

#
data['Product Category'] = data['Product Category'].astype(str)
data['Department'] = data['Department'].astype(str)
data['Brand'] = data['Brand'].astype(str)
data['product'] = data['product'].astype(str)
data['Color'] = data['Color'].astype(str)
data['Item'] = data['Item'].astype(str)
data['Vch No'] = data['Vch No'].astype(str)
data['year'] = data['year'].astype(str)
# data['month'] = data['month'].astype(str)

# fig = px.imshow(data.corr(),text_auto=True)
# fig.show()

# sperating pos quantity data
# brought items
pos_data = data[data['Qty'] > -1]
# returned items
neg_data = data[data['Qty'] < 0]

years = data['year'].unique()
months = data['month'].unique()
products = data['product'].unique()
brands = data['Brand'].unique()

# groups
year_group = pos_data.groupby('year')
month_group = pos_data.groupby('month')
year_group_sum = year_group.sum()
year_group_sum['Sale'] = year_group_sum['Amount']
month_group_sum = month_group.sum()

months = data['month'].unique()
months.sort()

# [year, month, total margins, costs, sales]
# 1) create dataframe for year and month with margin, cost and sales:
monthwise_sub_data = {'year': [], 'month': [], 'margin': [], 'cost': [], 'sale': []}
for year in years:
    # group by year
    df_year = year_group.get_group(year)
    month_f = df_year['month'].unique()
    month_grp = df_year.groupby('month')

    for month in month_f:
        df_month = month_grp.get_group(month)
        sum = df_month.sum()
        sales = sum['Amount']
        cost = sum['EffCost']
        # total margin
        margin = sum['Margin']
        # append values to lists
        monthwise_sub_data['year'].append(year)
        monthwise_sub_data['month'].append(month)
        monthwise_sub_data['sale'].append(sales)
        monthwise_sub_data['cost'].append(cost)
        monthwise_sub_data['margin'].append(margin)
# create dataframe from dictionary
monthwise_sub_data = pd.DataFrame(monthwise_sub_data)


def summary_all_years():
    fign = px.bar(year_group_sum, x=years, y=['Margin', 'Sale', 'EffCost'], barmode='group',
                  title='Year wise summary of sale,margin and cost', labels={"EffCost": "Sale"})
    graphJSON = json.dumps(fign, cls=plotly.utils.PlotlyJSONEncoder)

    return graphJSON


def summary_month_margin():
    fign = px.bar(monthwise_sub_data, x='month', y='margin', color='year',
                  barmode='group', title='Month wise summary of margin for different years')
    graphJSON = json.dumps(fign, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON


def summary_month_sales():
    fign = px.bar(monthwise_sub_data, x='month', y='sale', color='year',
                  barmode='group', title='Month wise summary of Sales for different years')
    graphJSON = json.dumps(fign, cls=plotly.utils.PlotlyJSONEncoder)

    return graphJSON


def monthwise_summary(from_year,to_year):
  try:
    monthwise_sub_data['year']=monthwise_sub_data['year'].astype(int)
    df = monthwise_sub_data[(monthwise_sub_data['year']>= from_year) & (monthwise_sub_data['year'] <= to_year)]
    fig = px.bar(df, x='month', y=['margin','cost','sale'], facet_row="year",facet_row_spacing=0.01,height=800, width=800, barmode='group',
              title='Summary of sale,margin and cost for every year ')
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

    return graphJSON
  except Exception as e:
     print("Error Occured ",e)
     return None


def animated_monthwise_summary():
  fig = px.bar(monthwise_sub_data, x='month', y=['margin','cost','sale'], animation_frame="year",
             animation_group="month", barmode='group', range_x = [0,13],range_y=[1000,3900000],
             title='Month-wise summary of sale,margin and cost for every year')
  graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

  return graphJSON


# popularity dataframe
# x-axis : margin
# yaxis : popularity
# animation : year

# create dataframe for year and brand distributed based on popularity and margin :
sub_data_1 = { 'year':[], 'brand':[], 'popularity':[], 'margin':[] }
brands = brands.astype(str)

for year in years:
  # group by year
  df_year = year_group.get_group(year)
  brands_f = df_year['Brand'].unique()
  # sub group by brand
  sub_brand = df_year.groupby('Brand')
  for brand in brands_f:
    sum = sub_brand.get_group(brand).sum()
    # popularity: total qty sold for the brand
    popularity = sum['Qty']
    # total margin for the brand
    margin = sum['Margin']
    # append values to lists
    sub_data_1['year'].append(year)
    sub_data_1['brand'].append(brand)
    sub_data_1['popularity'].append(popularity)
    sub_data_1['margin'].append(margin)
# create dataframe from dictionary
sub_data_1 = pd.DataFrame(sub_data_1)

# popularity
def popularity_yearwise():
  fig2 = px.scatter(sub_data_1, x="margin", y="popularity", animation_frame="year", animation_group="brand",
           color="brand", hover_name="brand", size = 'popularity',text='brand', height=700,
           log_x=True, size_max=100, title="Popularity vs Margin for different brands, yearwise")
  graphJSON = json.dumps(fig2, cls=plotly.utils.PlotlyJSONEncoder)

  return graphJSON

def compare_popularity_yearwise(brands):
  df = sub_data_1[sub_data_1['brand'].isin(brands)]
  fig2 = px.scatter(df, x="margin", y="popularity", animation_frame="year", animation_group="brand",
           color="brand", hover_name="brand", size = 'popularity',text='brand',
           log_x=True, size_max=100, title="Popularity vs Margin for different brands, yearwise")
  graphJSON = json.dumps(fig2, cls=plotly.utils.PlotlyJSONEncoder)

  return graphJSON

def numerizer(x):
  return numerize.numerize(x['margin'])

sub_data_1['margin_format'] = sub_data_1.apply(lambda x : numerizer(x),axis=1)
pos_sub_data = sub_data_1[sub_data_1['margin']>-1]
def margin_brands():
  fig = px.sunburst(pos_sub_data,path=['year','brand','margin_format'],color='brand',title="Yearwise Brands with Margin", values="margin")
  graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

  return graphJSON

#sunburst
sub_data_1['popularity'] = sub_data_1['popularity'].astype(int)
def popularity_brands():
  fig = px.sunburst(sub_data_1,path=['year','brand','popularity'],color='brand',title="Yearwise Brands with Popularity", values='popularity')
  graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

  return graphJSON


    # TREE MAP


# hierarical level data set
# Product Category -> Department -> Brand -> Product -> Design -> Color ->Total Margin and Popularity
# create dataframe for year and brand distributed based on popularity and margin :
sub_data = {'year': [], 'PC': [], 'Department': [], 'Brand': [], 'Product': [], 'Design': [], 'Color': [],
            'popularity': [], 'margin': [], 'sales': []}
brands = brands.astype(str)

for year in years:
    # group by year
    df_year = year_group.get_group(year)
    pcs = df_year['Product Category'].unique()
    pc_group = df_year.groupby('Product Category')
    for pc in pcs:
        # group by pcs
        df_pc = pc_group.get_group(pc)
        department_f = df_pc['Department'].unique()
        # sub group by dept
        sub_dept = df_pc.groupby('Department')
        for dept in department_f:
            df_dept = sub_dept.get_group(dept)
            brand_f = df_dept['Brand'].unique()
            sub_brand = df_dept.groupby('Brand')
            for brand in brand_f:
                df_brand = sub_brand.get_group(brand)
                prod_f = df_brand['product'].unique()
                sub_prod = df_brand.groupby('product')
                for prod in prod_f:
                    df_prod = sub_prod.get_group(prod)
                    design_f = df_prod['Design'].unique()
                    sub_design = df_prod.groupby('Design')
                    for des in design_f:
                        df_des = sub_design.get_group(des)
                        color_f = df_des['Color'].unique()
                        sub_col = df_des.groupby('Color')
                        for col in color_f:
                            df_col = sub_col.get_group(col)
                            color_f = df_prod['Color'].unique()
                            sum = sub_col.get_group(col).sum()
                            # popularity: total qty sold for the brand
                            popularity = sum['Qty']
                            # total margin for the brand
                            margin = sum['Margin']
                            sales = sum['Amount']
                            sub_data['year'].append(year)
                            sub_data['PC'].append(pc)
                            sub_data['Department'].append(dept)
                            sub_data['Brand'].append(brand)
                            sub_data['Product'].append(prod)
                            sub_data['Design'].append(des)
                            sub_data['Color'].append(col)
                            sub_data['popularity'].append(popularity)
                            sub_data['margin'].append(margin)
                            sub_data['sales'].append(sales)

        # append values to lists

# create dataframe from dictionary
sub_data = pd.DataFrame(sub_data)

data_2022 = sub_data[sub_data['year']==2022]

def treemap_popularity():
  fig = px.treemap(data_frame = data_2022, path=['PC','Department', 'Product','Brand','Design','Color','popularity'],
                   title='Popularity Analysis for Products upto Design Level',color='Brand',values = 'popularity')
  fig.update_traces(root_color="lightgrey")
  fig.update_layout(margin = dict(t=50, l=25, r=25, b=25))
  graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

  return graphJSON

def treemap_popularity_2():
    fig = px.treemap(data_frame = data_2022,color='Brand',
                      path=['PC','Department', 'Brand','Product','popularity'],
                      title='Popularity Analysis for Brands upto Product level',values = 'popularity')
    fig.update_traces(root_color="lightgrey")
    fig.update_layout(margin = dict(t=50, l=25, r=25, b=25))
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

    return graphJSON


def treemap_margin():
  fig = px.treemap(data_frame = data_2022,color='Brand',title='Margin Analysis for Brands upto Design level',
                   path=['PC','Department', 'Product','Brand','Design','Color','margin'])
  fig.update_traces(root_color="lightgrey")
  fig.update_layout(margin = dict(t=50, l=25, r=25, b=25))
  graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

  return graphJSON

def treemap_margin_2():
  fig = px.treemap(data_frame = data_2022, title='Margin Analysis for Brands upto Product Level',
                   path=['PC','Department', 'Brand','Product','Design','Color','margin'],color='Brand')
  fig.update_traces(root_color="lightgrey")
  fig.update_layout(margin = dict(t=50, l=25, r=25, b=25))
  graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

  return graphJSON


def scatter_product():
  fig = px.scatter(data_2022, y="Brand", x= "margin", color= "Product",
                 title="Effective Margin Distribution wrt Brand and Product")
  graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

  return graphJSON



def scatter_margin():
  fig = px.scatter(data_2022, x="popularity", y= "Brand", color= "Product",
                 title="Effective Popularity Distribution wrt Brand and Product")
  graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

  return graphJSON


def scatter_sales():
  fig = px.scatter(data_2022, x="sales", y= 'Brand', color= 'Product',
                 title="Effective Sales Distribution")
  graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

  return graphJSON


def scatter_sales_2(cat1, cat2):
  fig = px.scatter(pos_data, x="Amount", y= cat1, color= cat2,
                 title="Effective Sales Distribution")
  graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

  return graphJSON
