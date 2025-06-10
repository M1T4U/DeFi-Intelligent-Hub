
import { useState, useEffect, useCallback } from 'react';
import { PortfolioData, AIInsight } from '../types';
import { generateAIInsights } from '../services/geminiService';
import Card from './common/Card';
import Spinner from './common/Spinner';

interface AIInsightsPanelProps {
  portfolioData: PortfolioData | null;
  isVisible: boolean; // Only fetch when visible and portfolio data is available
}

const AIInsightsPanel: React.FC<AIInsightsPanelProps> = (props: AIInsightsPanelProps) => {
  const { portfolioData, isVisible } = props;
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = useCallback(async () => {
    if (!portfolioData || !isVisible) {
      setInsights([]); // Clear insights if not visible or no data
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const fetchedInsights = await generateAIInsights(portfolioData);
      setInsights(fetchedInsights);
    } catch (err) {
      console.error("AI Insights Panel Error:", err);
      setError(err instanceof Error ? err.message : 'Failed to fetch AI insights.');
      setInsights([]); // Clear insights on error
    } finally {
      setIsLoading(false);
    }
  }, [portfolioData, isVisible]);

  useEffect(() => {
    // Debounce or control fetch frequency if portfolioData changes too rapidly
    // For now, simple fetch on change if visible
    fetchInsights();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchInsights]); // fetchInsights is memoized by useCallback with portfolioData and isVisible as dependencies

  const renderContent = () => {
    if (!isVisible) return null; // Don't render anything if not supposed to be visible

    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-40">
          <Spinner />
          <p className="mt-2 text-text-muted-light dark:text-text-muted-dark">Generating AI Insights...</p>
        </div>
      );
    }

    if (error) {
      return <p className="text-loss">Error: {error}</p>;
    }

    if (insights.length === 0 && portfolioData) {
         return <p className="text-text-muted-light dark:text-text-muted-dark">No AI insights available at the moment. Try refreshing or check API key.</p>;
    }
    
    if (insights.length === 0 && !portfolioData) {
         return <p className="text-text-muted-light dark:text-text-muted-dark">Connect wallet and load portfolio to see AI insights.</p>;
    }


    return (
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {insights.map((insight) => (
          <div key={insight.id} className="p-3 bg-primary-light dark:bg-primary-dark rounded-lg shadow">
            <h4 className="font-semibold text-md text-accent-light dark:text-accent-dark">{insight.title}</h4>
            <p className="text-sm text-text-light dark:text-text-dark whitespace-pre-wrap">{insight.content}</p>
            <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">
              {new Date(insight.timestamp).toLocaleTimeString()} - {insight.type}
            </p>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <Card title="AI Powered Insights" className="col-span-1 md:col-span-3">
      {renderContent()}
    </Card>
  );
};

export default AIInsightsPanel;
